import { eq } from 'drizzle-orm';
import { validate } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';

import { DRIZZLE_SRV } from 'src/modules/drizzle';
import { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import { WorkoutEntity } from '../../domain/entites/workout.entity';
import { WorkoutsRepository } from '../../domain/interfaces/workouts.repository.interface';

import { workouts } from './schema/workout.schema';

@Injectable()
export class DrizzleWorkoutRepository implements WorkoutsRepository {
  constructor(
    @Inject(DRIZZLE_SRV)
    private readonly drizzleSrv: IdentifierOf<typeof DRIZZLE_SRV>,
  ) {}

  async createOne(_data: { name: string }): Promise<WorkoutEntity> {
    throw new Error('Not implemented');
  }

  async findOneBySlugOrId(slugOrId: string): Promise<WorkoutEntity | null> {
    const where = validate(slugOrId) ? eq(workouts.id, slugOrId) : eq(workouts.slug, slugOrId);

    const dbWorkout = await this.drizzleSrv.query.workouts.findFirst({
      where,
      with: { translations: true },
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
