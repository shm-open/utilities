// eslint-disable-next-line no-use-before-define
import React, {
    ComponentType,
    ForwardedRef,
    ReactNode,
    Component as ReactComponent,
    forwardRef,
} from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

interface Options {
    forwardRef?: boolean;
}

// Export to `index` will have to depend on `hoist-non-react-statics`
// eslint-disable-next-line import/no-unused-modules
export const withClassComponentWrapper = <T, H>(
    Component: ComponentType<T>,
    options?: Options,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<T>> => {
    class TargetComponent extends ReactComponent<T> {
        static displayName = `TargetComponent(${Component.displayName || 'unknown'})`;
        render() {
            const { forwardedRef, ...rest } = this.props as T & {
                forwardedRef: ForwardedRef<T>;
                children?: ReactNode;
            };

            return <Component ref={forwardedRef} {...(rest as T)} />;
        }
    }

    if (options.forwardRef) {
        // If you use `forwardRef`, `Animated.createAnimatedComponent` will be invalid
        const TargetComponentForward = forwardRef<ForwardedRef<H>, T>((props, ref) => {
            return <TargetComponent {...props} forwardedRef={ref} />;
        });
        TargetComponentForward.displayName = 'withClassComponentWrapper(TargetComponentForward)';
        return hoistNonReactStatics(TargetComponentForward, Component);
    }

    return hoistNonReactStatics(TargetComponent, Component);
};
