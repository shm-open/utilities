import { useRefWrapper } from './useRefWrapper';
import { SyncState, useSyncState } from './useSyncState';
import { useSyncStateListener } from './useSyncStateListener';

/**
 * create a reactive sync state object that update its value by compute method
 * @param state source sync state
 * @param compute comput the reactive sync state based on source sync state
 * @returns
 */
export function useReactiveSyncState<T, S>(
    state: SyncState<S>,
    compute: (value: S) => T,
): SyncState<T> {
    const computeRef = useRefWrapper(compute);

    const reactiveState = useSyncState(computeRef.current(state.getValue()));
    useSyncStateListener(state, (value) => {
        reactiveState.setValue(computeRef.current(value));
    });

    return reactiveState;
}
