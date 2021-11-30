import { renderHook } from '@testing-library/react-hooks';
import { SyncState, useSyncState } from './useSyncState';
import { useSyncStateEffect } from './useSyncStateEffect';

describe('useSyncStateEffect()', () => {
    it('single sync state effect without cleanup', () => {
        const effect = jest.fn();
        const { result } = renderHook(() => {
            const state = useSyncState(1);
            useSyncStateEffect(effect, [state]);
            return state;
        });

        expect(effect).toHaveBeenCalledTimes(1);
        result.current.setValue(2);
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('single sync state effect with cleanup', () => {
        const cleanup = jest.fn();
        const effect = jest.fn();
        effect.mockReturnValue(cleanup);
        const { result, unmount } = renderHook(() => {
            const state = useSyncState(1);
            useSyncStateEffect(effect, [state]);
            return state;
        });

        expect(effect).toHaveBeenCalledTimes(1);
        result.current.setValue(2);
        expect(cleanup).toHaveBeenCalledTimes(1);
        expect(effect).toHaveBeenCalledTimes(2);

        unmount();
        expect(cleanup).toHaveBeenCalledTimes(2);
    });

    it('multiple sync state effect', () => {
        const cleanup = jest.fn();
        const effect = jest.fn();
        effect.mockReturnValue(cleanup);
        const { result } = renderHook(() => {
            const state1 = useSyncState(1);
            const state2 = useSyncState('a');
            useSyncStateEffect(effect, [state1, state2]);
            return {
                state1,
                state2,
            };
        });

        expect(effect).toHaveBeenCalledTimes(1);
        result.current.state1.setValue(2);
        expect(cleanup).toHaveBeenCalledTimes(1);
        expect(effect).toHaveBeenCalledTimes(2);
        result.current.state2.setValue('b');
        expect(cleanup).toHaveBeenCalledTimes(2);
        expect(effect).toHaveBeenCalledTimes(3);
    });

    it('deps states change', () => {
        const effect = jest.fn();
        const { result: states } = renderHook(() => {
            const state1 = useSyncState(1);
            const state2 = useSyncState('a');
            return {
                state1,
                state2,
            };
        });
        const { rerender } = renderHook<SyncState<unknown>[], void>(
            (props) => {
                useSyncStateEffect(effect, props);
            },
            {
                initialProps: [states.current.state1],
            },
        );

        expect(effect).toHaveBeenCalledTimes(1);

        rerender([states.current.state2]);
        expect(effect).toHaveBeenCalledTimes(2);

        rerender([states.current.state2]);
        expect(effect).toHaveBeenCalledTimes(2);
    });
});
