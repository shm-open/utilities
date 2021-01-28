import { ComponentType, createElement, PropsWithChildren, ReactNode } from 'react';

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
}: PropsWithChildren<ComposeProvidersProps>): ReactNode {
    return providers.reduceRight((composed, Provider) => {
        return createElement(Provider, null, composed);
    }, children);
}
