import { useRef, MutableRefObject } from 'react';

/**
 * wraps input value into a ref, and keeps the ref sync with the input value
 * @param value
 */
export function useRefWrapper<T>(value: T): MutableRefObject<T> {
    const ref = useRef(value);
    ref.current = value;
    return ref;
}
