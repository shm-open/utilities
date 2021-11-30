import { renderHook } from '@testing-library/react-hooks';
import { useSyncState } from './useSyncState';
import { useSyncStateListener } from './useSyncStateListener';

describe('useSyncStateListener()', () => {
    it('listens to single sync state change', () => {
        const listener = jest.fn();
        const { result } = renderHook(() => {
            const state = useSyncState(1);
            useSyncStateListener(state, listener);
            return state;
        });

        result.current.setValue(2);
        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener.mock.calls[0][0]).toBe(2);
    });

    it('listens to multiple sync state changes', () => {
        const listener = jest.fn();
        const { result } = renderHook(() => {
            const state1 = useSyncState(1);
            const state2 = useSyncState('a');
            useSyncStateListener([state1, state2], listener);
            return {
                state1,
                state2,
            };
        });

        result.current.state1.setValue(2);
        result.current.state2.setValue('b');

        expect(listener).toHaveBeenCalledTimes(2);
        expect(listener.mock.calls[0][0]).toEqual([2, 'a']);
        expect(listener.mock.calls[1][0]).toEqual([2, 'b']);
    });
});
