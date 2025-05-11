import { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import { ProfileEntity } from 'src/modules/acount';

import { JWTTokenPayload } from './jwt-token';

export interface AuthService {
  validateProfileByEmail(email: string, password: string): Promise<ProfileEntity>;
  validateProfileByJWTTokenPayload(payload: JWTTokenPayload): Promise<ProfileEntity>;
}

export const AUTH_SRV = 'AUTH_SRV' as InjectableIdentifier<AuthService>;
