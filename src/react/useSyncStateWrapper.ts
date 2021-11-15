import { useLayoutEffect } from 'react';
import { SyncState, useSyncState } from './useSyncState';

/**
 * wraps input value into a sync state and keeps the sync state value
 * in sync with the input value.
 * @param value
 * @returns
 */
export function useSyncStateWrapper<T>(value: T): SyncState<T> {
    const state = useSyncState(value);

    useLayoutEffect(() => {
        state.setValue(value);
    });

    return state;
}
