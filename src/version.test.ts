import { version } from './version';

describe('version()', () => {
    it('isAbove() returns true for comparing with lower version number', () => {
        const result = version('9.0.0').isAbove('8.6.0');
        expect(result).toBe(true);
    });

    it('isAbove() returns false for comparing with higher version number', () => {
        const result = version('9.0.0').isAbove('9.1.0');
        expect(result).toBe(false);
    });

    it('isAbove() returns false for comparing with same version number', () => {
        const result = version('9.0.0').isAbove('9.0.0');
        expect(result).toBe(false);
    });

    it('isAboveOrEqualTo() returns true for comparing with lower version number', () => {
        const result = version('9.0.0').isAboveOrEqualTo('8.6.0');
        expect(result).toBe(true);
    });

    it('isAboveOrEqualTo() returns false for comparing with higher version number', () => {
        const result = version('9.0.0').isAboveOrEqualTo('9.1.0');
        expect(result).toBe(false);
    });

    it('isAboveOrEqualTo() returns true for comparing with same version number', () => {
        const result = version('9.0.0').isAboveOrEqualTo('9.0.0');
        expect(result).toBe(true);
    });

    it('isBelow() returns false for comparing with lower version number', () => {
        const result = version('9.0.0').isBelow('8.6.0');
        expect(result).toBe(false);
    });

    it('isBelow() returns true for comparing with higher version number', () => {
        const result = version('9.0.0').isBelow('9.1.0');
        expect(result).toBe(true);
    });

    it('isBelow() returns false for comparing with same version number', () => {
        const result = version('9.0.0').isBelow('9.0.0');
        expect(result).toBe(false);
    });

    it('isBelowOrEqualTo() returns false for comparing with lower version number', () => {
        const result = version('9.0.0').isBelowOrEqualTo('8.6.0');
        expect(result).toBe(false);
    });

    it('isBelowOrEqualTo() returns true for comparing with higher version number', () => {
        const result = version('9.0.0').isBelowOrEqualTo('9.1.0');
        expect(result).toBe(true);
    });

    it('isBelowOrEqualTo() returns true for comparing with same version number', () => {
        const result = version('9.0.0').isBelowOrEqualTo('9.0.0');
        expect(result).toBe(true);
    });
});
