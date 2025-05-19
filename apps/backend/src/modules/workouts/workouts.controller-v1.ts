import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import type * as zod from 'zod';

import { getManyWorkoutsQuerySchema, getOneWorkoutQuerySchema } from '@repo/api-models';

import { Public } from 'src/shared/decorators/public';
import { ApiCommonErrorResponses } from 'src/shared/utils/api-common-response';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import type { GetManyWorkoutsResponseDto } from './dto/get-many-workouts-response.dto';
import { GetOneWorkoutResponseDto } from './dto/get-one-workout-response.dto';
import { GetManyWorkoutsUseCase } from './use-cases/get-many-workouts.use-case';
import { GetOneWorkoutBySlugOrIdUseCase } from './use-cases/get-one-workout-by-slug-or-id.use-case';

@ApiTags('Workouts')
@Controller({ path: 'workouts', version: '1' })
export class WorkoutsControllerV1 {
  constructor(
    @Inject(GetOneWorkoutBySlugOrIdUseCase)
    private readonly getOneWorkoutBySlugOrIdUseCase: GetOneWorkoutBySlugOrIdUseCase,

    @Inject(GetManyWorkoutsUseCase)
    private readonly getManyWorkoutsUseCase: GetManyWorkoutsUseCase
  ) {}

  @Get()
  @Public()
  // TODO add swagger
  async findMany(
    @ReqCtx() reqCtx: RequestContext,
    @Query(new ZodValidationPipe(getManyWorkoutsQuerySchema))
    query: zod.infer<typeof getManyWorkoutsQuerySchema>
  ): Promise<GetManyWorkoutsResponseDto | null> {
    return this.getManyWorkoutsUseCase.execute(reqCtx, query);
  }

  @Get(':slugOrId')
  @Public()
  @ApiOperation({
    description: 'Returns one workout by slug or ID',
    operationId: 'Get one workout',
  })
  @ApiParam({
    description: 'Workout slug or id',
    examples: {
      slug: { summary: 'Workout slug', value: 'workout-unique-slug' },
      uuid: { summary: 'Workout id', value: '550e8400-e29b-41d4-a716-446655440000' },
    },
    name: 'slugOrId',
  })
  @ApiQuery({ description: 'Locale', example: 'en', name: 'locale', type: 'string' })
  @ApiOkResponse({ type: GetOneWorkoutResponseDto })
  @ApiCommonErrorResponses('not_found', 'bad_request')
  async findOne(
    @ReqCtx() reqCtx: RequestContext,
    @Param('slugOrId') slugOrId: string,
    @Query(new ZodValidationPipe(getOneWorkoutQuerySchema))
    query: zod.infer<typeof getOneWorkoutQuerySchema>
  ): Promise<GetOneWorkoutResponseDto | null> {
    return this.getOneWorkoutBySlugOrIdUseCase.execute(reqCtx, slugOrId, query);
  }
}
