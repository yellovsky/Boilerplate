import type { LoginWithEmailResponse, StatusSuccessResponse } from '@repo/api-models';

import { getApiClient } from '@shared/lib/api-client';

export const signOut = async (): Promise<StatusSuccessResponse> => {
  const apiClient = getApiClient();
  return apiClient.post<LoginWithEmailResponse>('/v1/auth/logout', null, { withCredentials: true });
};
