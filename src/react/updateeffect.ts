import { useEffect, useRef } from 'react';

type UseEffectParameters = Parameters<typeof useEffect>;

export function useUpdateEffect(
    effect: UseEffectParameters[0],
    deps?: UseEffectParameters[1],
): void {
    const isFirstMount = useRef(true);
    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return undefined;
        }
        return effect();
    }, deps);
}
