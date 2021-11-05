import { useState } from 'react';
import { SyncState } from './useSyncState';
import { useSyncStateListener } from './useSyncStateListener';

/**
 *
 * @param state
 * @returns
 */
export function useSyncStateValue<T>(state: SyncState<T>): T {
    // triggers rerender during state change
    const [, setTrack] = useState<T>(state.getValue());
    useSyncStateListener(state, setTrack);

    return state.getValue();
}
