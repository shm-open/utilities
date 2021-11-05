import { useEffect } from 'react';
import { SyncState } from './useSyncState';

/**
 *
 * @param state
 * @param listener
 */
export function useSyncStateListener<T>(state: SyncState<T>, listener: (value: T) => void): void {
    useEffect(() => {
        return state.addListener(listener);
    }, [listener, state]);
}
