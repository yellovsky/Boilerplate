import { Provider } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';
import { useHydrateAtoms } from 'jotai/utils';
import type { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// see: https://jotai.org/docs/extensions/query#example
const HydrateAtoms: FC<PropsWithChildren<{ queryClient: QueryClient }>> = ({
  children,
  queryClient,
}) => {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return children;
};

interface AppProvidersProps extends PropsWithChildren {
  queryClient: QueryClient;
}

export const AppProviders: FC<AppProvidersProps> = props => {
  return (
    <QueryClientProvider client={props.queryClient}>
      <Provider>
        <HydrateAtoms queryClient={props.queryClient}>{props.children}</HydrateAtoms>
      </Provider>
    </QueryClientProvider>
  );
};
