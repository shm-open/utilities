import { renderHook } from '@testing-library/react-hooks';
import { useIsMountedRef } from './useIsMountedRef';

describe('useIsMountedRef()', () => {
    it('return true for mounted', () => {
        const { result } = renderHook(() => useIsMountedRef());
        expect(result.current.current).toBe(true);
    });

    it('return false for unmounted', () => {
        const { result, unmount } = renderHook(() => useIsMountedRef());
        unmount();
        expect(result.current.current).toBe(false);
    });
});
