import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/modules/prisma';

import { GetOneWorkoutBySlugOrIdUseCase } from './application/use-cases/get-one-workout-by-slug-or-id.use-case';
import { WORKOUTS_REPO } from './domain/interfaces/workouts.repository.interface';
import { WorkoutsAccessServiceImpl } from './application/services/workouts-access.service';
import { WorkoutsControllerV1 } from './workouts.controller-v1';
import { WorkoutsRepositoryImpl } from './infrastructure/repositories/workouts.repository';
import { WorkoutsServiceImpl } from './application/services/workouts.service';
import { WORKOUTS_ACCESS_SRV, WORKOUTS_SRV } from './domain/interfaces/workouts.service.interface';

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
