import { Inject, Injectable } from '@nestjs/common';
import * as Either from 'effect/Either';

import { NotFoundReason, type ResultOrExcluded } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import { ProfileEntity } from '../entities/profile.entity';
import type { ProfilesRepository } from '../interfaces/profiles.repository.interface';
import { type DBProfile, dbProfileSelect } from './profiles.repository.types';

@Injectable()
export class ProfilesRepositoryImpl implements ProfilesRepository {
  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  async findProfileById(repoCtx: TxRequestContext, id: string): Promise<ResultOrExcluded<ProfileEntity>> {
    const prisma = repoCtx.tx ?? this.prismaSrv;

    const dbProfile = await prisma.profile.findUnique({ select: dbProfileSelect, where: { id } });
    return !dbProfile ? Either.left(new NotFoundReason()) : Either.right(this.#toProfileEntity(dbProfile));
  }

  async findAccountRootProfile(repoCtx: TxRequestContext, accountId: string): Promise<ResultOrExcluded<ProfileEntity>> {
    const prisma = repoCtx.tx ?? this.prismaSrv;
    const dbProfile = await prisma.profile.findFirst({ select: dbProfileSelect, where: { accountId, isRoot: true } });
    return !dbProfile ? Either.left(new NotFoundReason()) : Either.right(this.#toProfileEntity(dbProfile));
  }

  #toProfileEntity(dbProfile: DBProfile): ProfileEntity {
    return ProfileEntity.from({
      accountId: dbProfile.accountId,
      createdAt: dbProfile.createdAt,
      id: dbProfile.id,
      isRoot: dbProfile.isRoot,
      name: dbProfile.name,
      updatedAt: dbProfile.updatedAt,
    });
  }
}
