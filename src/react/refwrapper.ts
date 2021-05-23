import { useRef, MutableRefObject, useEffect } from 'react';

/**
 * wraps input value into a ref, and keeps the ref sync with the input value
 * useful for handle often-changing deps for useCallback
 * https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 * @param value
 */
export function useRefWrapper<T>(value: T): MutableRefObject<T> {
    const ref = useRef(value);

    useEffect(() => {
        ref.current = value;
    });

    return ref;
}
