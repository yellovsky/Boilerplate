import { Inject, Injectable } from '@nestjs/common';

import type { ResultOrExcluded } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ProfileEntity } from '../entities/profile.entity';
import { PROFILES_REPO } from '../interfaces/profiles.repository.interface';
import type { ProfilesService } from '../interfaces/profiles.service.interface';

@Injectable()
export class ProfilesServiceImpl implements ProfilesService {
  constructor(
    @Inject(PROFILES_REPO)
    private readonly profilesRepo: IdentifierOf<typeof PROFILES_REPO>
  ) {}

  getProfileById(reqCtx: RequestContext, id: string): Promise<ResultOrExcluded<ProfileEntity>> {
    return this.profilesRepo.findProfileById(reqCtx, id);
  }
}
