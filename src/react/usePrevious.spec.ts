import { renderHook } from '@testing-library/react-hooks';
import { usePrevious } from './usePrevious';

describe('usePrevious()', () => {
    it('returns undefined for initial value', () => {
        const { result } = renderHook(() => usePrevious(1));
        expect(result.current).toBe(undefined);
    });

    it('returns previous value after rerender', () => {
        const { result, rerender } = renderHook((props) => usePrevious(props), { initialProps: 1 });
        rerender(2);
        expect(result.current).toBe(1);
        rerender(3);
        expect(result.current).toBe(2);
    });
});
