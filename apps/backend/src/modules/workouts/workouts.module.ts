import { Module } from '@nestjs/common';

import { CasbinModule } from 'src/modules/casbin';
import { PrismaModule } from 'src/modules/prisma';

import { WORKOUTS_REPO } from './interfaces/workouts.repository.interface';
import { WORKOUTS_SRV } from './interfaces/workouts.service.interface';
import { WORKOUTS_ACCESS_SRV } from './interfaces/workouts-access.service.interface';
import { WorkoutsRepositoryImpl } from './repositories/workouts.repository';
import { WorkoutsServiceImpl } from './services/workouts.service';
import { WorkoutsAccessServiceImpl } from './services/workouts-access.service';
import { GetManyWorkoutsUseCase } from './use-cases/get-many-workouts.use-case';
import { GetOneWorkoutBySlugOrIdUseCase } from './use-cases/get-one-workout-by-slug-or-id.use-case';
import { WorkoutsControllerV1 } from './workouts.controller-v1';

@Module({
  controllers: [WorkoutsControllerV1],
  imports: [PrismaModule, CasbinModule],
  providers: [
    { provide: WORKOUTS_REPO, useClass: WorkoutsRepositoryImpl },
    { provide: WORKOUTS_SRV, useClass: WorkoutsServiceImpl },
    { provide: WORKOUTS_ACCESS_SRV, useClass: WorkoutsAccessServiceImpl },
    GetOneWorkoutBySlugOrIdUseCase,
    GetManyWorkoutsUseCase,
  ],
})
export class WorkoutsModule {}
