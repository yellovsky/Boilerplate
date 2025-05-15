import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/modules/prisma';

import { WORKOUTS_REPO } from './domain/interfaces/workouts.repository.interface';
import { WORKOUTS_ACCESS_SRV, WORKOUTS_SRV } from './domain/interfaces/workouts.service.interface';

import { WorkoutsServiceImpl } from './application/services/workouts.service';
import { WorkoutsAccessServiceImpl } from './application/services/workouts-access.service';
import { GetOneWorkoutBySlugOrIdUseCase } from './application/use-cases/get-one-workout-by-slug-or-id.use-case';

import { WorkoutsRepositoryImpl } from './infrastructure/repositories/workouts.repository';

import { WorkoutsControllerV1 } from './workouts.controller-v1';

@Module({
  controllers: [WorkoutsControllerV1],
  imports: [PrismaModule],
  providers: [
    { provide: WORKOUTS_REPO, useClass: WorkoutsRepositoryImpl },
    { provide: WORKOUTS_SRV, useClass: WorkoutsServiceImpl },
    { provide: WORKOUTS_ACCESS_SRV, useClass: WorkoutsAccessServiceImpl },
    GetOneWorkoutBySlugOrIdUseCase,
  ],
})
export class WorkoutsModule {}
