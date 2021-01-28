/**
 * Make a Partial<T> type with all its field types as partial - recursively
 */
export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object
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
export type PropertyType<T extends object, K extends keyof T> = T[K];

/**
 * Extract the type of array item
 */
export type ArrayItemType<T extends unknown[]> = T[number];
