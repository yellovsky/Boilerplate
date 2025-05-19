import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

export interface BcryptService {
  hash(pwd: string, roundsOfHashing?: number): Promise<string>;
  compare(pwd: string, pwdToCompare: string): Promise<boolean>;
}

export const BCRYPT_SRV = 'BCRYPT_SRV' as InjectableIdentifier<BcryptService>;
