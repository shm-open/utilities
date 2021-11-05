import { renderHook } from '@testing-library/react-hooks';
import { useSyncState } from './useSyncState';

describe('useSyncState()', () => {
    it('initial value is correct', () => {
        const { result } = renderHook((props) => useSyncState(props), { initialProps: 1 });
        expect(result.current.getValue()).toBe(1);
    });

    it('value change triggers listener', () => {
        const { result } = renderHook((props) => useSyncState(props), {
            initialProps: 1,
        });
        const listener = jest.fn();
        const subscription = result.current.addListener(listener);
        result.current.setValue(2);

        expect(result.current.getValue()).toBe(2);
        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener.mock.calls[0][0]).toBe(2);

        subscription();
    });
});
