import * as isDeepEqual from 'fast-deep-equal';
import { useEffect, useRef } from 'react';

/**
 * use memo instance if value is consider to be not changed during render by deep equal comparsion
 * @param value
 * @returns
 */
export function useDeepEqualMemo<T>(value: T): T {
    const ref = useRef<T>();

    const isEqual = isDeepEqual(value, ref.current);
    useEffect(() => {
        if (!isEqual) {
            ref.current = value;
        }
    });

    return isEqual ? ref.current : value;
}
