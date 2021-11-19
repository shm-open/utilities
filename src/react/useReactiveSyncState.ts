import { useEffect, useRef } from 'react';
import { useRefWrapper } from './useRefWrapper';
import { SyncState, useSyncState } from './useSyncState';

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
    const latestValueRef = useRef(state.getValue());
    const reactiveState = useSyncState(computeRef.current(latestValueRef.current));
    useEffect(() => {
        if (latestValueRef.current !== state.getValue()) {
            latestValueRef.current = state.getValue();
            reactiveState.setValue(computeRef.current(latestValueRef.current));
        }
        return state.addListener('change', (value) => {
            if (latestValueRef.current === value) {
                return;
            }
            latestValueRef.current = value;
            reactiveState.setValue(computeRef.current(value));
        });
    }, [computeRef, reactiveState, state]);

    return reactiveState;
}
