import { useLayoutEffect, useRef, MutableRefObject } from 'react';

/**
 *
 */
export function useIsMountedRef(): MutableRefObject<boolean> {
    const isMountedRef = useRef(false);

    useLayoutEffect(() => {
        isMountedRef.current = true;

        return (): void => {
            isMountedRef.current = false;
        };
    });

    return isMountedRef;
}
