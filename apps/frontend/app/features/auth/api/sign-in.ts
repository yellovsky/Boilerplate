import type { LoginWithEmailBody, LoginWithEmailResponse } from '@repo/api-models';

import { getApiClient } from '@shared/lib/api-client';

export const signIn = async (body: LoginWithEmailBody): Promise<LoginWithEmailResponse> => {
  const apiClient = getApiClient();
  return apiClient.post<LoginWithEmailResponse>('/v1/auth/login', body, { withCredentials: true });
};
