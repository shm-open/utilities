import { formatNumber } from './number';

describe('formatNumber()', () => {
    it('handles digits', () => {
        let result = formatNumber(1.234, { digits: 0 });
        expect(result).toBe('1');

        result = formatNumber(1.234, { digits: 2 });
        expect(result).toBe('1.23');

        result = formatNumber(1.234, { digits: 4 });
        expect(result).toBe('1.2340');

        result = formatNumber(1.234, { digits: 4, digitsMode: 'max' });
        expect(result).toBe('1.234');

        result = formatNumber(1.234, { digits: 2, digitsMode: 'fixed' });
        expect(result).toBe('1.23');

        result = formatNumber(1.234, { digits: 2, digitsMode: 'fixed' });
        expect(result).toBe('1.23');
    });

    it('handles roundMethod', () => {
        let result = formatNumber(1.5, { digits: 0 });
        expect(result).toBe('1');

        result = formatNumber(1.6, { digits: 0, roundMethod: 'round' });
        expect(result).toBe('2');

        result = formatNumber(1.4, { digits: 0, roundMethod: 'ceil' });
        expect(result).toBe('2');
    });

    it('handles units', () => {
        let result = formatNumber(15000, { digits: 0, units: [{ value: 1000, displayName: 'K' }] });
        expect(result).toBe('15K');

        result = formatNumber(5000, {
            digits: 0,
            units: [{ value: 1000, displayName: 'K', threshold: 10000 }],
        });
        expect(result).toBe('5000');

        result = formatNumber(1500, { digits: 1, units: [{ value: 1000, displayName: 'K' }] });
        expect(result).toBe('1.5K');

        result = formatNumber(15000000, {
            digits: 1,
            digitsMode: 'fixed',
            units: [
                { value: 1000000, displayName: 'M' },
                { value: 1000, displayName: 'K' },
            ],
        });
        expect(result).toBe('15.0M');
    });

    it('works around the precision issue', () => {
        let result = formatNumber(6660 / 100, {
            digits: 2,
            digitsMode: 'fixed',
            roundMethod: 'floor',
        });
        expect(result).toBe('66.60');

        result = formatNumber(0.1 + 0.2, { digits: 1, digitsMode: 'fixed', roundMethod: 'ceil' });
        expect(result).toBe('0.3');
    });
});
