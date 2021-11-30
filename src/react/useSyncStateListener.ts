import { useEffect } from 'react';
import { useCallbackProxy } from './useCallbackProxy';
import { useDeepEqualMemo } from './useDeepEqualMemo';
import { SyncState } from './useSyncState';

export function useSyncStateListener<T>(state: SyncState<T>, listener: (value: T) => void): void;

export function useSyncStateListener<T, U>(
    states: [SyncState<T>, SyncState<U>],
    listener: (values: [T, U]) => void,
): void;
export function useSyncStateListener<T, U, V>(
    states: [SyncState<T>, SyncState<U>, SyncState<V>],
    listener: (values: [T, U, V]) => void,
): void;
export function useSyncStateListener<T, U, V, W>(
    states: [SyncState<T>, SyncState<U>, SyncState<V>, SyncState<W>],
    listener: (values: [T, U, V, W]) => void,
): void;
export function useSyncStateListener<T, U, V, W, X>(
    states: [SyncState<T>, SyncState<U>, SyncState<V>, SyncState<W>, SyncState<X>],
    listener: (values: [T, U, V, W, X]) => void,
): void;

/**
 *
 * @param state
 * @param listener
 */
export function useSyncStateListener<T, U, V, W, X>(
    states:
        | SyncState<T>
        | [SyncState<T>, SyncState<U>]
        | [SyncState<T>, SyncState<U>, SyncState<V>]
        | [SyncState<T>, SyncState<U>, SyncState<V>, SyncState<W>]
        | [SyncState<T>, SyncState<U>, SyncState<V>, SyncState<W>, SyncState<X>],
    listener: (value: T | unknown[]) => void,
): void {
    const listenerProxy = useCallbackProxy(listener);
    const statesMemo = useDeepEqualMemo(states);
    useEffect(() => {
        const syncStates = Array.isArray(statesMemo) ? statesMemo : ([statesMemo] as const);
        const proxy = () => {
            const values = syncStates.map((state) => state.getValue());
            listenerProxy(values.length === 1 ? values[0] : values);
        };

        const subscriptions = syncStates.map((state: SyncState<unknown>) =>
            state.addListener(proxy),
        );

        return () => {
            subscriptions.forEach((subscription) => subscription());
        };
    }, [listenerProxy, statesMemo]);
}
