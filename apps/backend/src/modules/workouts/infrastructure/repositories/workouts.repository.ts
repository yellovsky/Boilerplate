import type { Prisma } from '@generated/prisma';
import { Inject, Injectable } from '@nestjs/common';
import * as Either from 'effect/Either';
import { validate } from 'uuid';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { type SkippedOr, SkippedReason } from 'src/shared/utils/load-result';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import { ShortWorkoutEntity } from '../../domain/entites/short-workout.entity';
import { WorkoutEntity } from '../../domain/entites/workout.entity';
import type { FindManyWorkoutsParams, WorkoutsRepository } from '../../domain/interfaces/workouts.repository.interface';
import {
  type DBShortWorkout,
  type DBWorkout,
  dbShortWorkoutSelect,
  dbWorkoutSelect,
} from './workouts.repository.types';

@Injectable()
export class WorkoutsRepositoryImpl implements WorkoutsRepository {
  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  async createOne(_data: { name: string }): Promise<WorkoutEntity> {
    throw new Error('Not implemented');
  }

  async findOneBySlugOrId(slugOrId: string): Promise<SkippedOr<WorkoutEntity>> {
    const where: Prisma.WorkoutWhereUniqueInput = validate(slugOrId) ? { id: slugOrId } : { slug: slugOrId };
    const dbWorkout = await this.prismaSrv.workout.findUnique({ where, select: dbWorkoutSelect });
    return this.#makeWorkoutEntity(dbWorkout);
  }

  async findManyWorkouts(
    txCtx: TxRequestContext,
    params: FindManyWorkoutsParams
  ): Promise<SkippedOr<ShortWorkoutEntity>[]> {
    const tx = txCtx.tx || this.prismaSrv;

    const founded = await tx.workout.findMany({
      select: dbShortWorkoutSelect,
      orderBy: this.#getOrderBy(params),
      take: params.take,
      skip: params.skip,
    });

    return founded.map(this.#makeShortWorkoutEntity);
  }

  async findManyWorkoutsTotal(txCtx: TxRequestContext, params: FindManyWorkoutsParams): Promise<number> {
    const tx = txCtx.tx || this.prismaSrv;
    return tx.workout.count({ orderBy: this.#getOrderBy(params) });
  }

  #getOrderBy(params: FindManyWorkoutsParams): Prisma.WorkoutOrderByWithAggregationInput {
    // TODO make clear function witjout switch
    switch (params.orderBy) {
      case 'createdAt':
        return { createdAt: 'asc' };

      default:
        return { createdAt: 'desc' };
    }
  }

  #makeShortWorkoutEntity(dbShortWorkout: DBShortWorkout): SkippedOr<ShortWorkoutEntity> {
    const entity = ShortWorkoutEntity.from({
      createdAt: dbShortWorkout.createdAt,
      id: dbShortWorkout.id,
      publishedAt: dbShortWorkout.publishedAt,
      slug: dbShortWorkout.slug,
      updatedAt: dbShortWorkout.updatedAt,

      translations: dbShortWorkout.translations.map((translations) => ({
        createdAt: translations.createdAt,
        languageCode: translations.languageCode,
        name: translations.name,
        publishedAt: translations.publishedAt,
        updatedAt: translations.updatedAt,
      })),
    });

    return Either.right(entity);
  }

  #makeWorkoutEntity(dbWorkout: DBWorkout | null): SkippedOr<WorkoutEntity> {
    if (!dbWorkout) return Either.left({ reason: SkippedReason.NOT_FOUND });

    const entity = WorkoutEntity.from({
      createdAt: dbWorkout.createdAt,
      id: dbWorkout.id,
      publishedAt: dbWorkout.publishedAt,
      slug: dbWorkout.slug,
      updatedAt: dbWorkout.updatedAt,

      translations: dbWorkout.translations.map((translations) => ({
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

    return Either.right(entity);
  }
}
