import { renderHook } from '@testing-library/react-hooks';
import { useRefWrapper } from './useRefWrapper';

describe('useRefWrapper()', () => {
    it('wraps initial value', () => {
        const { result } = renderHook(() => useRefWrapper(1));
        expect(result.current.current).toBe(1);
    });

    it('wraps value can be updated during rerender', () => {
        const { result, rerender } = renderHook((props) => useRefWrapper(props), {
            initialProps: 1,
        });
        rerender(2);
        expect(result.current.current).toBe(2);
    });
});
