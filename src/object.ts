/**
 * filter undefined values from given object, it returns a new object
 * @param target object to filter out undefined values
 */
export function filterUndefinedValues<T>(target: T): Partial<T> {
    return Object.keys(target)
        .filter((key) => target[key] !== undefined)
        .reduce((result, key) => {
            result[key] = target[key];
            return result;
        }, {});
}
