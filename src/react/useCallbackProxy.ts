import { useCallback } from 'react';
import { useRefWrapper } from './useRefWrapper';

/**
 * similar to useCallback() but without dependency list.
 * it uses a ref to keep the latest instance of proxied callback function.
 * the trade-off here is that the ref may not get updated inside render function,
 * since the ref update happends in useLayoutEffect()
 * @param callback
 * @returns
 */
export function useCallbackProxy<T extends (...args: never[]) => unknown>(callback: T): T {
    const callbackRef = useRefWrapper<T>(callback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback<T>(
        ((...args) => {
            return callbackRef.current(...args);
        }) as T,
        [callbackRef],
    );
}
