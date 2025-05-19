import type { ResultOrExcluded } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ProfileEntity } from 'src/modules/acount';

import type { JWTTokenPayload } from './jwt-token';

export interface AuthService {
  validateProfileByEmail(
    reqCtx: RequestContext,
    email: string,
    password: string
  ): Promise<ResultOrExcluded<ProfileEntity>>;

  validateProfileByJWTTokenPayload(
    reqCtx: RequestContext,
    payload: JWTTokenPayload
  ): Promise<ResultOrExcluded<ProfileEntity>>;
}

export const AUTH_SRV = 'AUTH_SRV' as InjectableIdentifier<AuthService>;
