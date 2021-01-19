type IChildrenExtractor<T> = (node: T) => T[] | undefined;
const createArrayChildrenExtractor = <T>(childrenKey: string): IChildrenExtractor<T> => {
    return (node) => node[childrenKey];
};

type ITreeFlattener<T> = (node: T) => T[];
/**
 * create a flattener method that can flatten tree into node list
 * @param childrenExtractor
 */
export const createTreeFlattener = <T>(
    childrenExtractor: IChildrenExtractor<T>,
): ITreeFlattener<T> => {
    const flattener: ITreeFlattener<T> = (node) => {
        const children = childrenExtractor(node);
        if (!children || !Array.isArray(children)) {
            return [node];
        }
        return children.map(flattener).reduce(
            (list, childList) => {
                return list.concat(childList);
            },
            [node],
        );
    };
    return flattener;
};

/**
 * create a flattener method that can flatten tree into node list, specialized version of childrenExtractor
 * @param childrenKey
 */
export function createArrayChildrenTreeFlattener<T>(childrenKey: string): ITreeFlattener<T> {
    return createTreeFlattener(createArrayChildrenExtractor(childrenKey));
}

type INodeFilter<T> = (node: T) => boolean;
type INodeCloner<T> = (node: T, childrenReplace: T[]) => T;
type ITreeFilter<T> = (node: T) => T | undefined;
/**
 * create a filter method that can generate a new tree with nodes filtered
 * @param filter
 * @param childrenExtractor
 * @param nodeCloner
 */
export function createTreeFilter<T>(
    filter: INodeFilter<T>,
    childrenExtractor: IChildrenExtractor<T>,
    nodeCloner: INodeCloner<T>,
): ITreeFilter<T> {
    const treeFilter: ITreeFilter<T> = (node) => {
        if (!filter(node)) {
            return;
        }
        const children = childrenExtractor(node);
        if (!children || !Array.isArray(children)) {
            // unchanged, just return node
            return node;
        }

        const childrenReplace = children
            .map((child) => treeFilter(child))
            .filter((child) => !!child);

        return nodeCloner(node, childrenReplace);
    };

    return treeFilter;
}

/**
 * create a filter method that can generate a new tree with nodes filtered, specialized version of createTreeFilter
 * @param filter
 * @param childrenKey
 */
export function createArrayChildrenTreeFilter<T extends {}>(
    filter: INodeFilter<T>,
    childrenKey: string,
): ITreeFilter<T> {
    return createTreeFilter(
        filter,
        createArrayChildrenExtractor(childrenKey),
        (node, childrenReplace) => {
            return Object.assign({}, node, {
                [childrenKey]: childrenReplace,
            });
        },
    );
}

type ITreeFinder<T> = (node: T) => T | undefined;
/**
 * create a finder method that can find a node matches filter in breadth first order
 * @param filter
 * @param childrenExtractor
 */
export function createBreadthFirstTreeFinder<T>(
    filter: INodeFilter<T>,
    childrenExtractor: IChildrenExtractor<T>,
): ITreeFinder<T> {
    return (node) => {
        const queue = [node];
        while (queue.length > 0) {
            const node = queue.shift();
            if (filter(node)) {
                return node;
            }
            const children = childrenExtractor(node);
            if (children && Array.isArray(children)) {
                queue.push(...children);
            }
        }
    };
}

/**
 * create a finder method that can find a node matches filter in breadth first order, specialized version of createBreadthFirstTreeFinder
 * @param filter
 * @param childrenKey
 */
export function createBreadthFirstArrayChildrenTreeFinder<T extends {}>(
    filter: INodeFilter<T>,
    childrenKey: string,
): ITreeFinder<T> {
    return createBreadthFirstTreeFinder(filter, createArrayChildrenExtractor(childrenKey));
}
