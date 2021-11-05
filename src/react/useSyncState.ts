import { useRef } from 'react';
import { ListenerSubscription, ListenerHolder } from '../listener';

/**
 * sync state object
 */
// eslint-disable-next-line import/no-unused-modules
export interface SyncState<T> {
    /**
     * get current state value
     */
    getValue(): T;
    /**
     * set state value
     * @param value
     */
    setValue(value: T): void;
    /**
     * add an listener to the value change
     * @param listener
     */
    addListener(listener: (value: T) => void): ListenerSubscription;
}

class SyncStateImpl<T> implements SyncState<T> {
    private value: T;
    private listenerHolder = new ListenerHolder<'change', (value: T) => void>();

    constructor(init: T | (() => T)) {
        if (typeof init === 'function') {
            this.value = (init as () => T)();
        } else {
            this.value = init;
        }
    }

    getValue() {
        return this.value;
    }

    setValue(value: T) {
        if (value === this.value) {
            return;
        }

        this.value = value;
        this.listenerHolder.dispatch('change', value);
    }

    addListener(listener: (value: T) => void): ListenerSubscription {
        return this.listenerHolder.addListener('change', listener);
    }
}

/**
 * useState updates asynchronouslly but sometimes we need synchronous state management
 * when interacting with external data source. SyncState is designed for this case.
 * it has a synchronous getValue() and setValue() method, and triggers listener callback
 * when value changes. there are serval hooks help working with SyncState:
 * - useSyncState(init): this hook, create a sync state object
 * - useSyncStateValue(): get the current value of the sync state object and make sure component rerenders when value changes
 * - useSyncStateListener(state, effect): attach listener to sync state object
 * - useReactiveSyncState(state, compute): create a reactive sync state object that update its value by compute method
 * @param init
 * @returns
 */
export function useSyncState<T>(init: T | (() => T)): SyncState<T> {
    const stateRef = useRef(new SyncStateImpl(init));
    return stateRef.current;
}
