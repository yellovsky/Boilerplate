import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import type * as zod from 'zod';

import { getManyPermissionPoliciesQuerySchema } from '@repo/api-models';

import { ApiCommonErrorResponses } from 'src/shared/utils/api-common-response';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { PermissionPolicyListResponseDto } from './dto/permission-policy-list-response.dto';
import { GetPermissionPoliciesListUseCase } from './use-cases/get-permission-policies-list.use-case';

@ApiTags('Permission policies')
@Controller({ path: 'permission-policies', version: '1' })
export class PermissionPoliciesControllerV1 {
  constructor(
    @Inject(GetPermissionPoliciesListUseCase)
    private readonlygetPermissionPoliciesListUseCase: GetPermissionPoliciesListUseCase
  ) {}

  @Get()
  @ApiOperation({
    description: 'Returns paginated list of permission policies',
    operationId: 'Get permission policies list',
  })
  @ApiQuery({ description: 'Locale', example: 'en', name: 'locale', type: 'string' })
  @ApiQuery({ description: 'Page', name: 'page', type: 'object' })
  @ApiOkResponse({ type: PermissionPolicyListResponseDto })
  @ApiCommonErrorResponses('bad_request', 'forbidden', 'unauthorized')
  async getPermissionPoliciesList(
    @ReqCtx() reqCtx: RequestContext,
    @Query(new ZodValidationPipe(getManyPermissionPoliciesQuerySchema))
    query: zod.infer<typeof getManyPermissionPoliciesQuerySchema>
  ): Promise<PermissionPolicyListResponseDto> {
    return this.readonlygetPermissionPoliciesListUseCase.execute(reqCtx, query);
  }
}
