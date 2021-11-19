import { useEffect } from 'react';
import { useCallbackProxy } from './useCallbackProxy';
import { SyncState } from './useSyncState';

/**
 *
 * @param state
 * @param listener
 */
export function useSyncStateListener<T>(state: SyncState<T>, listener: (value: T) => void): void {
    const listenerProxy = useCallbackProxy(listener);
    useEffect(() => {
        return state.addListener(listenerProxy);
    }, [listenerProxy, state]);
}
