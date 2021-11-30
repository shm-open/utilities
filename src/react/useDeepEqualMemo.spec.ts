import { renderHook } from '@testing-library/react-hooks';
import { useDeepEqualMemo } from './useDeepEqualMemo';

describe('useDeepEqualMemo()', () => {
    it('returns the same instance if not changed by deep equal comparsion', () => {
        const { result, rerender } = renderHook((props) => useDeepEqualMemo(props), {
            initialProps: [1, 2, 3],
        });
        const initValue = result.current;
        rerender([1, 2, 3]);
        expect(result.current).toBe(initValue);
        rerender([1, 2, 3, 4]);
        expect(result.current).not.toBe(initValue);
    });
});
