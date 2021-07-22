interface FormatNumberUnit {
    /**
     * the value that this unit stands for
     */
    value: number;
    /**
     * name append to the formatted string when this unit gets applied
     */
    displayName: string;
    /**
     * the default is to apply unit when number is larger than unit value,
     * but there are cases we want 600 -> 0.6K or leave 1200 alone.
     * the threshold supports these case
     */
    threshold?: number;
}
/**
 * options for formatNumber
 */
interface FormatNumberOptions {
    /**
     * how many digits should be kept, default is unlimited
     */
    digits?: number;
    /**
     * how to deal with the digits limit - e.g. 1.20 or 1.2 for digits = 2
     * default is 'fixed'
     */
    digitsMode?: 'fixed' | 'max';
    /**
     * round method used for limit the digits
     * default is 'floor'
     */
    roundMethod?: 'floor' | 'round' | 'ceil';
    /**
     * units that should be used,
     * the array should be sorted according to value(threshold) large to small
     */
    units?: FormatNumberUnit[];

    /**
     * when working with floor/ceil round method, plus/minus the epsilon to deal with float point number issue like
     * - 6659.999999999999 = 66.6 * 100
     * - 0.30000000000000004 = 0.1 + 0.3
     * default is 0.00000001
     */
    epsilon?: number;
}
/**
 * format number to string according given options, e.g. 2400 -> 2.4K
 * @param num
 */
export function formatNumber(num: number, options?: FormatNumberOptions): string {
    if (!options) {
        return `${num}`;
    }
    const {
        digits,
        digitsMode = 'fixed',
        roundMethod = 'floor',
        units,
        epsilon = 0.00000001,
    } = options;

    // deal with negative number
    const isNegative = num < 0;
    let value = Math.abs(num);

    // deal with unit
    const unit = units?.find((item) => {
        const threshold = item.threshold ?? item.value;
        return value >= threshold;
    });
    let unitDisplayName = '';
    if (unit) {
        value /= unit.value;
        unitDisplayName = unit.displayName;
    }

    // deal with digits
    if (typeof digits === 'number') {
        const factor = 10 ** digits;
        value *= factor;
        switch (roundMethod) {
            case 'floor':
                value = Math.floor(value + epsilon);
                break;
            case 'ceil':
                value = Math.ceil(value - epsilon);
                break;
            default:
                value = Math.round(value);
                break;
        }
        value /= factor;
    }

    const strValue =
        typeof digits === 'number' && digitsMode === 'fixed' ? value.toFixed(digits) : `${value}`;

    // put the final string
    return `${isNegative ? '-' : ''}${strValue}${unitDisplayName}`;
}
