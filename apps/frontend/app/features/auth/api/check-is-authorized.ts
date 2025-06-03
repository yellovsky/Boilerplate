import type { IsAuthorizedResponse } from '@repo/api-models';

import { getApiClient } from '@shared/lib/api-client';

export const getIsAuthorized = async (): Promise<IsAuthorizedResponse> => {
  const apiClient = getApiClient();
  return apiClient.get('/v1/auth/is-authorized', { withCredentials: true });
};
