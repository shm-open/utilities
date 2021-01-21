import { useEffect, useRef } from 'react';

/**
 * just like prevProp, prevState
 * https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 * @param value
 */
export function usePrevious<T>(value: T): T {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}
