import { useEffect, useState } from 'react';
import { SyncState } from './useSyncState';

/**
 *
 * @param state
 * @returns
 */
export function useSyncStateValue<T>(state: SyncState<T>): T {
    // triggers rerender during state change
    const [, setTrack] = useState<T>(state.getValue());

    useEffect(() => {
        setTrack(state.getValue());
        return state.addListener(setTrack);
    }, [state]);

    return state.getValue();
}
