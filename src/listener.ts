export interface ListenerSubscription {
    /**
     * remove the listener
     */
    (): void;
    /**
     *  remove the listener
     */
    remove: () => void;
}

/**
 * a general event listener holder for listener subscription utilities
 */
export class ListenerHolder<
    T,
    L extends (...args: never[]) => unknown = (...args: unknown[]) => unknown,
> {
    private listenersByType = new Map<T, L[]>();
    private nextListenersByType = new Map<T, L[]>();

    /**
     * get current listeners for sending notification
     * @param type event type
     */
    public getListeners(type: T): L[] {
        const { listenersByType, nextListenersByType } = this;
        // update the pending next listeners
        const nextListeners = nextListenersByType.get(type);
        if (nextListeners) {
            nextListenersByType.delete(type);
            listenersByType.set(type, nextListeners);
        }

        return listenersByType.get(type) || [];
    }

    /**
     * add a listener
     * @param type event type
     * @param listener listener to add
     * @returns listener subscription object which can be used to remove the listener
     */
    public addListener(type: T, listener: L): ListenerSubscription {
        const nextListeners = this.getNextListeners(type);
        if (!nextListeners.includes(listener)) {
            nextListeners.push(listener);
        }

        const remove = (): void => this.removeListener(type, listener);
        remove.remove = remove;
        return remove;
    }

    /**
     * remove a listener
     * @param type event type
     * @param listener listener to remove
     */
    public removeListener(type: T, listener: L): void {
        const nextListeners = this.getNextListeners(type);
        const index = nextListeners.indexOf(listener);
        if (index !== -1) {
            nextListeners.splice(index, 1);
        }
    }

    /**
     * dispatch event to listeners
     * @param type event type
     * @param args event args
     */
    public dispatch(type: T, ...args: Parameters<L>): void {
        const listeners = this.getListeners(type);
        for (let i = 0; i < listeners.length; i += 1) {
            listeners[i](...args);
        }
    }

    private getNextListeners(type: T): L[] {
        const { nextListenersByType } = this;
        const nextListeners = nextListenersByType.get(type);
        if (nextListeners) {
            return nextListeners;
        }

        const listeners = (this.listenersByType.get(type) || []).slice(0);
        nextListenersByType.set(type, listeners);
        return listeners;
    }
}
