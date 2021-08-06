import hoistNonReactStatics from 'hoist-non-react-statics';
import { createElement, ComponentType, Component, ComponentClass } from 'react';

/**
 * wraps a component with a class component,
 * can be useful to work together with class component only API, such as Animated.createAnimatedComponent()
 */
export function withClassComponentWrapper<T>(
    WrappedComponent: ComponentType<T>,
): ComponentClass<T> {
    const wrappedComponentName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component';
    class WrapperComponent extends Component<T> {
        static displayName = `withClassComponentWrapper(${wrappedComponentName})`;

        render() {
            return createElement(WrappedComponent, this.props);
        }
    }

    return hoistNonReactStatics(WrapperComponent, WrappedComponent);
}
