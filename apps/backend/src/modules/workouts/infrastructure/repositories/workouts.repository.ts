import type { Prisma } from '@generated/prisma';
import { validate } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';

import { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { PRISMA_SRV } from 'src/modules/prisma';

import { WorkoutEntity } from '../../domain/entites/workout.entity';
import { WorkoutsRepository } from '../../domain/interfaces/workouts.repository.interface';

@Injectable()
export class WorkoutsRepositoryImpl implements WorkoutsRepository {
  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>,
  ) {}

  async createOne(_data: { name: string }): Promise<WorkoutEntity> {
    throw new Error('Not implemented');
  }

  async findOneBySlugOrId(slugOrId: string): Promise<WorkoutEntity | null> {
    const where: Prisma.WorkoutWhereUniqueInput = validate(slugOrId)
      ? { id: slugOrId }
      : { slug: slugOrId };

    const dbWorkout = await this.prismaSrv.workout.findUnique({
      include: { translations: true },
      where,
    });
    if (!dbWorkout) return null;

    return WorkoutEntity.from({
      createdAt: dbWorkout.createdAt,
      id: dbWorkout.id,
      publishedAt: dbWorkout.publishedAt,
      slug: dbWorkout.slug,
      updatedAt: dbWorkout.updatedAt,

      translations: dbWorkout.translations.map(translations => ({
        createdAt: translations.createdAt,
        languageCode: translations.languageCode,
        name: translations.name,
        publishedAt: translations.publishedAt,
        updatedAt: translations.updatedAt,

        seoDescription: translations.seoDescription,
        seoKeywords: translations.seoKeywords,
        seoTitle: translations.seoTitle,
      })),
    });
  }
}
