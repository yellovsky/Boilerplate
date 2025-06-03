import { atomWithMutation } from 'jotai-tanstack-query';

import type { FailedResponse, StatusSuccessResponse } from '@repo/api-models';

import { getQueryClient } from '@shared/lib/query-client';

import { signOut } from '../api/sign-out';
import { IS_AUTHORIZED_QUERY_KEY } from './is-authorized-atom';

export const signOutMutationAtom = atomWithMutation<StatusSuccessResponse, void, FailedResponse>(() => ({
  mutationFn: signOut,
  onSuccess: () => {
    const queryClient = getQueryClient();
    queryClient.invalidateQueries({ queryKey: IS_AUTHORIZED_QUERY_KEY });
  },
}));
