import { useEffect } from 'react';
import { SyncState } from './useSyncState';

type UseEffectParameters = Parameters<typeof useEffect>;

export function useSyncStateEffect(
    effect: UseEffectParameters[0],
    deps: SyncState<unknown>[],
): void {
    useEffect(() => {
        // execute effect by default
        let effectCleanup: (() => void) | void | undefined = effect();
        const listener = () => {
            if (effectCleanup) {
                effectCleanup();
                effectCleanup = undefined;
            }
            effectCleanup = effect();
        };
        // add listener to deps
        const subscriptions = deps.map((state) => state.addListener(listener));

        return () => {
            subscriptions.forEach((subscription) => subscription());
            if (effectCleanup) {
                effectCleanup();
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
