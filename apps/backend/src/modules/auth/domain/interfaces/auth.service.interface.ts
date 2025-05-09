import { AccountEntity } from 'src/modules/acount';
import { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import { JWTTokenPayload } from './jwt-token';

export interface AuthService {
  validateAccountByEmail(email: string, password: string): Promise<AccountEntity>;
  validateAccountByJWTTokenPayload(payload: JWTTokenPayload): Promise<AccountEntity>;
}

export const AUTH_SRV = 'AUTH_SRV' as InjectableIdentifier<AuthService>;
