import type { Prisma } from '@generated/prisma';
import { Inject, Injectable } from '@nestjs/common';
import * as Either from 'effect/Either';
import { validate } from 'uuid';

import { NotFoundReason, type ResultOrExcluded } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
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

  async findOneBySlugOrId(txCtx: TxRequestContext, slugOrId: string): Promise<ResultOrExcluded<WorkoutEntity>> {
    const prisma = txCtx.tx ?? this.prismaSrv;
    const where: Prisma.WorkoutWhereUniqueInput = validate(slugOrId) ? { id: slugOrId } : { slug: slugOrId };
    const dbWorkout = await prisma.workout.findUnique({ where, select: dbWorkoutSelect });
    return !dbWorkout ? Either.left(new NotFoundReason()) : Either.right(this.#toWorkoutEntity(dbWorkout));
  }

  async findManyWorkouts(
    txCtx: TxRequestContext,
    params: FindManyWorkoutsParams
  ): Promise<ResultOrExcluded<ShortWorkoutEntity>[]> {
    const tx = txCtx.tx || this.prismaSrv;

    const founded = await tx.workout.findMany({
      select: dbShortWorkoutSelect,
      orderBy: this.#getOrderBy(params),
      take: params.take,
      skip: params.skip,
    });

    return founded.map(this.#toShortWorkoutEntity).map(Either.right);
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

  #toShortWorkoutEntity(dbShortWorkout: DBShortWorkout): ShortWorkoutEntity {
    return ShortWorkoutEntity.from({
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
  }

  #toWorkoutEntity(dbWorkout: DBWorkout): WorkoutEntity {
    return WorkoutEntity.from({
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
  }
}
