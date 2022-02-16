import { useRef } from 'react';
import { ListenerSubscription, ListenerHolder } from '../listener';

type SyncStateEvent = 'beforeChange' | 'change' | 'afterChange';

/**
 * sync state object
 */
// eslint-disable-next-line import/no-unused-modules
export class SyncState<T> {
    private value: T;
    private listenerHolder = new ListenerHolder<SyncStateEvent, (value: T) => void>();

    constructor(init: T | (() => T)) {
        if (typeof init === 'function') {
            this.value = (init as () => T)();
        } else {
            this.value = init;
        }
    }

    /**
     * get current state value
     */
    getValue(): T {
        return this.value;
    }

    /**
     * set state value
     * @param value
     */
    setValue(value: T): void {
        if (value === this.value) {
            return;
        }
        this.listenerHolder.dispatch('beforeChange', value);
        this.value = value;
        this.listenerHolder.dispatch('change', value);
        this.listenerHolder.dispatch('afterChange', value);
    }

    /**
     * add a listener to the afterChange event
     * @param listener
     */
    addListener(listener: (value: T) => void): ListenerSubscription;

    /**
     * add an event listener
     * @param event
     *  - beforeChange: before value change, designed for reduce listener/effect calls if a batch of
     *      reactive state changes are going to be triggered
     *  - change: value change, designed for ReactiveSyncState, sync states need to be updated
     *      first before default listeners called to ensure the correct values are retrived
     *  - afterChange: after value change, default listen to this event
     */
    addListener(event: SyncStateEvent, listener: (value: T) => void): ListenerSubscription;

    addListener(
        eventOrListener: SyncStateEvent | ((value: T) => void),
        listener?: (value: T) => void,
    ): ListenerSubscription {
        if (typeof eventOrListener === 'function') {
            return this.listenerHolder.addListener('afterChange', eventOrListener);
        }

        return this.listenerHolder.addListener(eventOrListener, listener);
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
    const stateRef = useRef(new SyncState(init));
    return stateRef.current;
}
