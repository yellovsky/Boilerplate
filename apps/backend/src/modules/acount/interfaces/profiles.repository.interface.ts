import type { ResultOrExcluded } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { ProfileEntity } from '../entities/profile.entity';

export interface ProfilesRepository {
  findProfileById(repoCtx: TxRequestContext, id: string): Promise<ResultOrExcluded<ProfileEntity>>;
  findAccountRootProfile(repoCtx: TxRequestContext, accountId: string): Promise<ResultOrExcluded<ProfileEntity>>;
}

export const PROFILES_REPO = 'PROFILES_REPO' as InjectableIdentifier<ProfilesRepository>;
