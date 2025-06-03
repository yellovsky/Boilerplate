import { atomWithMutation } from 'jotai-tanstack-query';

import type { FailedResponse, LoginWithEmailBody, LoginWithEmailResponse } from '@repo/api-models';

import { getQueryClient } from '@shared/lib/query-client';

import { signIn } from '../api/sign-in';
import { IS_AUTHORIZED_QUERY_KEY } from './is-authorized-atom';

export const signInMutationAtom = atomWithMutation<LoginWithEmailResponse, LoginWithEmailBody, FailedResponse>(() => ({
  mutationFn: signIn,
  onSuccess: () => {
    const queryClient = getQueryClient();
    queryClient.invalidateQueries({ queryKey: IS_AUTHORIZED_QUERY_KEY });
  },
}));
