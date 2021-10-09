import { renderHook } from '@testing-library/react-hooks';
import { useCallbackProxy } from './useCallbackProxy';

describe('useCallbackProxy()', () => {
    it('proxy callback calls', () => {
        const mock1 = jest.fn();
        mock1.mockReturnValueOnce(10);
        const { result } = renderHook(() => useCallbackProxy(mock1));
        const ret = result.current(1);
        expect(ret).toBe(10);
        expect(mock1.mock.calls.length).toBe(1);
        expect(mock1.mock.calls[0][0]).toBe(1);
    });

    it('proxy calls to latest instance', () => {
        const mock1 = jest.fn();
        mock1.mockReturnValueOnce(10);
        const { result, rerender } = renderHook((props) => useCallbackProxy(props), {
            initialProps: mock1,
        });
        // return value is correct for 1st call
        expect(result.current()).toBe(10);
        const preValue = result.current;

        const mock2 = jest.fn();
        mock2.mockReturnValueOnce(20);
        rerender(mock2);

        // return value is correct for 2nd call
        expect(result.current()).toBe(20);
        // both mock called
        expect(mock1.mock.calls.length).toBe(1);
        expect(mock2.mock.calls.length).toBe(1);

        // proxy instance not changed
        expect(result.current).toBe(preValue);
    });
});
