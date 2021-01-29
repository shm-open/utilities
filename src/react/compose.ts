import { ComponentType, createElement, PropsWithChildren, ReactElement, ReactNode } from 'react';

interface ComposeProvidersProps {
    providers: ComponentType[];
}

/**
 * Compose multiple context providers together:
 * <Provider1>
 *     <Provider2>            <ComposeProviders providers={[Provider1, Provider2]}>
 *         {children}   =>        {children}
 *     </Provider2>           </ComposeProviders>
 * </Provider1>
 */
export function ComposeProviders({
    providers = [],
    children,
}: PropsWithChildren<ComposeProvidersProps>): ReactElement {
    return providers.reduceRight((composed, Provider) => {
        return createElement(Provider, null, composed);
    }, children) as ReactElement;
}
