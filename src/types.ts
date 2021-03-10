/**
 * Make a Partial<T> type with all its field types as partial - recursively
 */
export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : // eslint-disable-next-line @typescript-eslint/ban-types
        T[P] extends object
        ? RecursivePartial<T[P]>
        : T[P];
};

/**
 * Nullable<T> could be T or undefined or null
 */
export type Nullable<T> = T | undefined | null;

/**
 * Extract the type of object property
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type PropertyType<T extends object, K extends keyof T> = T[K];

/**
 * Extract the type of array item
 */
export type ArrayItemType<T extends unknown[]> = T[number];

/**
 * Extract thee types array of function parameters
 */
export type ParametersTypes<T> = T extends (...args: infer P) => unknown ? P : [];

/**
 * Convert interface type to type, it can be used to work with Record<string, unknown>
 * check out this thread for details
 * https://github.com/microsoft/TypeScript/issues/15300#issuecomment-760165845
 */
export type Typify<T> = { [K in keyof T]: T[K] };

/**
 * Covert type T to Promise<T> except for Promises
 */
export type Promisify<T> = T extends Promise<unknown> ? T : Promise<T>;
