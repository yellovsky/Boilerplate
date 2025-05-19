import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import type { JWTTokenPayload } from './jwt-token';

export interface AccessTokenService {
  generate(payload: JWTTokenPayload): Promise<string>;
  parse(token: string): Promise<JWTTokenPayload>;
  validate(payload: unknown): Promise<JWTTokenPayload>;
}

export const ACCESS_TOKEN_SRV = 'ACCESS_TOKEN_SRV' as InjectableIdentifier<AccessTokenService>;
