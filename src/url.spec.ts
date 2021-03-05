/* eslint-disable max-lines-per-function */
import {
    parseURL,
    stringifyURL,
    getDomainName,
    parseURLParams,
    appendURLParams,
    decodeURLParams,
} from './url';

describe('parseURL()', () => {
    it('handles normal url', () => {
        const result = parseURL(
            'https://www.51shihuimiao.com/screen/index/index.html?rev=1234#test=1',
        );
        expect(result).toEqual({
            protocol: 'https:',
            username: '',
            password: '',
            hostname: 'www.51shihuimiao.com',
            port: '',
            pathname: '/screen/index/index.html',
            search: '?rev=1234',
            hash: '#test=1',
        });
    });

    it('handles url with auth and port', () => {
        const result = parseURL(
            'http://user:password@www.51shihuimiao.com:8080/screen/index/index.html?rev=1234#test=1',
        );
        expect(result).toEqual({
            protocol: 'http:',
            username: 'user',
            password: 'password',
            hostname: 'www.51shihuimiao.com',
            port: '8080',
            pathname: '/screen/index/index.html',
            search: '?rev=1234',
            hash: '#test=1',
        });
    });

    it('handles relative url', () => {
        const result = parseURL('screen/index/index.html?rev=1234');
        expect(result).toEqual({
            protocol: '',
            username: '',
            password: '',
            hostname: '',
            port: '',
            pathname: 'screen/index/index.html',
            search: '?rev=1234',
            hash: '',
        });
    });

    it('handles root path', () => {
        const result = parseURL('https://www.51shihuimiao.com?rev=1234#test=1');
        expect(result).toEqual({
            protocol: 'https:',
            username: '',
            password: '',
            hostname: 'www.51shihuimiao.com',
            port: '',
            pathname: '/',
            search: '?rev=1234',
            hash: '#test=1',
        });
    });

    it('handles pure query string', () => {
        const result = parseURL('?rev=1234');
        expect(result).toEqual({
            protocol: '',
            username: '',
            password: '',
            hostname: '',
            port: '',
            pathname: '',
            search: '?rev=1234',
            hash: '',
        });
    });

    it('handles mixed hash and query string', () => {
        const result = parseURL(
            'https://www.51shihuimiao.com/screen/index/index.html#test=1?rev=1234',
        );
        expect(result).toEqual({
            protocol: 'https:',
            username: '',
            password: '',
            hostname: 'www.51shihuimiao.com',
            port: '',
            pathname: '/screen/index/index.html',
            search: '',
            hash: '#test=1?rev=1234',
        });
    });
});

describe('stringifyURL()', () => {
    it('handles normal url', () => {
        const result = stringifyURL({
            protocol: 'https:',
            hostname: 'www.51shihuimiao.com',
            pathname: '/screen/index/index.html',
            search: '?rev=1234',
            hash: '#test=1',
        });
        expect(result).toEqual(
            'https://www.51shihuimiao.com/screen/index/index.html?rev=1234#test=1',
        );
    });

    it('handles url with auth and port', () => {
        const result = stringifyURL({
            protocol: 'http:',
            username: 'user',
            password: 'password',
            hostname: 'www.51shihuimiao.com',
            port: '8080',
            pathname: '/screen/index/index.html',
            search: '?rev=1234',
            hash: '#test=1',
        });
        expect(result).toEqual(
            'http://user:password@www.51shihuimiao.com:8080/screen/index/index.html?rev=1234#test=1',
        );
    });

    it('handles relative url', () => {
        const result = stringifyURL({
            pathname: 'screen/index/index.html',
            search: '?rev=1234',
        });
        expect(result).toEqual('screen/index/index.html?rev=1234');
    });

    it('handles relative with host', () => {
        const result = stringifyURL({
            hostname: 'www.51shihuimiao.com',
            pathname: 'screen/index/index.html',
            search: '?rev=1234',
        });
        expect(result).toEqual('www.51shihuimiao.com/screen/index/index.html?rev=1234');
    });

    it('handles pure query string', () => {
        const result = stringifyURL({
            search: '?rev=1234',
        });
        expect(result).toEqual('?rev=1234');
    });
});

describe('getDomainName()', () => {
    it('www.51shihuimiao.com', () => {
        const result = getDomainName('www.51shihuimiao.com');
        expect(result).toEqual('51shihuimiao.com');
    });

    it('www.sina.com.cn', () => {
        const result = getDomainName('www.sina.com.cn', 3);
        expect(result).toEqual('sina.com.cn');
    });

    it('localhost', () => {
        const result = getDomainName('localhost');
        expect(result).toEqual('localhost');
    });
});

describe('appendURLParams()', () => {
    it('result has correct', () => {
        const result = appendURLParams('https://www.51shihuimiao.com', {
            x: 1,
            y: 2,
            direct: 'https://www.51shihuimiao.com?z=3',
        });
        expect(result).toEqual(
            'https://www.51shihuimiao.com/?x=1&y=2&direct=https%3A%2F%2Fwww.51shihuimiao.com%3Fz%3D3',
        );
    });
    it('the quest mark not repeat to add', () => {
        const result = appendURLParams('https://www.51shihuimiao.com/?x=1', { y: 2 });
        expect(result).toEqual('https://www.51shihuimiao.com/?x=1&y=2');
    });

    it('cant adding empty obj', () => {
        const result = appendURLParams('https://www.51shihuimiao.com', {});
        expect(result).toEqual('https://www.51shihuimiao.com');
    });
});

describe('parseURLParams()', () => {
    it('result is correct', () => {
        const result = parseURLParams(
            'https://www.51shihuimiao.com?x=1&y=2&direct=https%3A%2F%2Fwww.51shihuimiao.com%3Fz%3D3',
        );
        expect(result.x).toEqual('1');
        expect(result.y).toEqual('2');
        expect(result.direct).toEqual('https://www.51shihuimiao.com?z=3');
    });

    it('handles empty param', () => {
        const result = parseURLParams('?x=');
        expect(result.x).toEqual(undefined);
    });

    it('handles empty inputs', () => {
        const result = parseURLParams('');
        expect(result).toEqual({});
    });

    it('handles array', () => {
        const result = parseURLParams('?x=1&x=2&x=3');
        expect(result.x).toEqual(['1', '2', '3']);
    });

    it('ignores hash', () => {
        const result = parseURLParams('?x=1&y=2#a=1');
        expect(result.x).toEqual('1');
        expect(result.y).toEqual('2');
        expect(result.a).toEqual(undefined);
    });
});

describe('decodeURLParams()', () => {
    it('handles empty inputs', () => {
        const result = decodeURLParams('');
        expect(result).toEqual({});
    });
});
