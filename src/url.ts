type URLParamValueType = string | number | boolean;
/**
 *
 */
export type URLParamType = Record<string, URLParamValueType | URLParamValueType[]>;
/**
 *
 */
export type ParsedURLParamType = Record<string, string | string[]>;

/**
 *
 * @param text
 * @param delimiter
 * @param include include the delimiter in result?
 * @param fromBack search direction
 */
function sliceBy(
    text: string,
    delimiter: string,
    include = false,
    fromBack = false,
): [string, string] {
    const index = text.indexOf(delimiter);
    if (index === -1) {
        if (fromBack) {
            return ['', text];
        }
        return [text, ''];
    }

    return [
        text.slice(0, index) + (include && fromBack ? delimiter : ''),
        (include && !fromBack ? delimiter : '') + text.slice(index + delimiter.length),
    ];
}

/**
 * parsed url
 */
export interface URL {
    protocol: string;
    username: string;
    password: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
}

/**
 * parse the protocol, hostname, pathname, search, hash from url
 * it behaviors like the native(web browser) URL
 * @param url
 */
export function parseURL(url: string): URL {
    let rest = url;
    const reProtocol = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i;
    // extract protocol
    const protocolMatch = reProtocol.exec(url);
    const protocol = protocolMatch[1]?.toLowerCase() ?? '';
    const hasSlashes = !!protocolMatch[2];
    // eslint-disable-next-line prefer-destructuring
    rest = protocolMatch[3];

    // extract hash & query
    let hash: string;
    // eslint-disable-next-line prefer-const
    [rest, hash] = sliceBy(rest, '#', true);
    let search: string;
    // eslint-disable-next-line prefer-const
    [rest, search] = sliceBy(rest, '?', true);

    // extract host & auth
    let wholeHost = '';
    if (hasSlashes) {
        [wholeHost, rest] = sliceBy(rest, '/', true);
    }
    const [auth, host] = sliceBy(wholeHost, '@', false, true);
    const [username, password] = sliceBy(auth, ':');
    const [hostname, port] = sliceBy(host, ':');

    return {
        protocol,
        username,
        password,
        hostname,
        port,
        // has hostname, default to '/'
        pathname: !rest && hostname ? '/' : rest,
        search,
        hash,
    };
}

/**
 * compose parsed url result to url string
 * @param url
 */
export function stringifyURL(url: Partial<URL>): string {
    return `${url.protocol ? `${url.protocol}//` : ''}${url.username ?? ''}${
        url.password ? `:${url.password}` : ''
    }${url.username || url.password ? '@' : ''}${url.hostname ?? ''}${
        url.port ? `:${url.port}` : ''
    }${
        // eslint-disable-next-line no-nested-ternary
        url.pathname && url.pathname !== '/'
            ? url.pathname[0] === '/' || !url.hostname
                ? url.pathname
                : `/${url.pathname}`
            : (url.search || url.hash) && url.hostname
            ? '/'
            : ''
    }${url.search ?? ''}${url.hash ?? ''}`;
}

/**
 * get the domain name from host name
 * www.51shihuimiao.com => 51shihuimiao.com
 * @param host
 * @param levels default 2 levels, e.g. xxx.com, xxx.org
 */
export function getDomainName(hostname: string, levels = 2): string {
    const segments = hostname.split('.');
    if (levels < segments.length) {
        return segments.slice(segments.length - levels).join('.');
    }
    return hostname;
}

/**
 * encode url params
 * @param params
 * @param prefix - '#' or '?' char for params prefix
 */
export function encodeURLParams(params: URLParamType, prefix = ''): string {
    const encoded = Object.entries(params)
        .map((entry) => {
            const [key, value] = entry;
            if (!Array.isArray(value)) {
                return `${key}=${encodeURIComponent(value)}`;
            }
            if (value !== undefined) {
                return value.map((v) => `${key}=${encodeURIComponent(v)}`).join('&');
            }
            return '';
        })
        .filter((entry) => !!entry)
        .join('&');
    if (!encoded) {
        return '';
    }
    return `${prefix}${encoded}`;
}

function mergeURLParamsImpl<T>(
    base: Record<string, T | T[]>,
    toBeMerged: [string, T | T[]][],
): Record<string, T | T[]> {
    const merged = { ...base };
    return toBeMerged.reduce((res, [key, value]) => {
        if (value === undefined) {
            return res;
        }
        const valueInRes = res[key];
        if (valueInRes === undefined) {
            res[key] = value;
            return res;
        }

        if (!Array.isArray(valueInRes)) {
            res[key] = [valueInRes];
        }

        res[key] = (res[key] as T[]).concat(value);
        return res;
    }, merged);
}

/**
 * merge url params together
 * @param params1
 * @param params2
 */
export function mergeURLParams(params1: URLParamType, params2: URLParamType): URLParamType {
    return mergeURLParamsImpl(params1, Object.entries(params2));
}

/**
 * decode url params
 * @param encoded
 */
export function decodeURLParams(encoded: string): ParsedURLParamType {
    return mergeURLParamsImpl(
        {},
        (encoded[0] === '?' || encoded[0] === '#' ? encoded.slice(1) : encoded)
            .split('&')
            .map((entry) => {
                const [key, value] = entry.split('=');
                return [decodeURIComponent(key), decodeURIComponent(value)] as [string, string];
            })
            .filter(([key, value]) => key && value),
    );
}

function updateURLParams(
    url: string,
    params: URLParamType,
    type: 'search' | 'hash',
    delimiter: '?' | '#',
    merger: (params1: URLParamType, params2: URLParamType) => URLParamType,
): string {
    if (!params) {
        return url;
    }
    const parsed = parseURL(url);
    const existParams = decodeURLParams(parsed[type]);
    parsed[type] = encodeURLParams(merger(existParams, params), delimiter);
    return stringifyURL(parsed);
}

/**
 * append params to url as url parameters, it uses key=v1&key=v2 for { [key]: [v1, v2] } case
 * @param url base url
 * @param params params to append
 */
export function appendURLParams(url: string, params: URLParamType): string {
    return updateURLParams(url, params, 'search', '?', mergeURLParams);
}

/**
 * append params to url as hash parameters
 * newly added hash params will be merged together with existing params
 * @param url
 * @param params
 */
export function appendURLHashParams(url: string, params: URLParamType): string {
    return updateURLParams(url, params, 'hash', '#', mergeURLParams);
}

/**
 * set params value to url, it overrides existing params
 * @param url
 * @param params
 */
export function setURLParams(url: string, params: URLParamType): string {
    return updateURLParams(url, params, 'search', '?', Object.assign);
}

/**
 * set params value to url hash, it overrides existing hash
 * @param url
 * @param params
 */
export function setURLHashParams(url: string, params: URLParamType): string {
    return updateURLParams(url, params, 'hash', '#', Object.assign);
}

/**
 * parse the params to JSON from given url
 * @param url string
 * @returns JSON structure that is string key and string value
 * @example
 *
 * const url = `https://www.51shihuimiao.com?x=1&y=2&direct=${encodeURIComponent('https://www.51shihuimiao.com?z=3')}`
 *
 * parse(url)
 * // => { x:'1', y:'2', direct:'https://www.51shihuimiao.com?z=3' }
 */
export function parseURLParams(url: string): ParsedURLParamType {
    const { search } = parseURL(url);
    return decodeURLParams(search);
}

/**
 * parse the hash - using the url params schema - to JSON from given url
 * @param url
 */
export function parseURLHashParams(url: string): ParsedURLParamType {
    const { hash } = parseURL(url);
    return decodeURLParams(hash);
}
