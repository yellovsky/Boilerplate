import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

export interface AppConfigService {
  readonly jwtSecret: string;
  readonly webClientHostname: string;
  readonly redisUrl: string;
}

export const APP_CONFIG_SRV = 'APP_CONFIG_SRV' as InjectableIdentifier<AppConfigService>;
