import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import type { ProfileEntity } from 'src/modules/acount';

import type { JWTTokenPayload } from './jwt-token';

export interface AuthService {
  validateProfileByEmail(email: string, password: string): Promise<ProfileEntity>;
  validateProfileByJWTTokenPayload(payload: JWTTokenPayload): Promise<ProfileEntity>;
}

export const AUTH_SRV = 'AUTH_SRV' as InjectableIdentifier<AuthService>;
