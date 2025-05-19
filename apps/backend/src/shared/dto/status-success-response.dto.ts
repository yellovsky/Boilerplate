import { ApiProperty } from '@nestjs/swagger';

import type { StatusSuccessResponse } from '@repo/api-models';

import type { JSONLike } from 'src/shared/utils/json-like';

import { SuccessResponseDto } from './success-response.dto';

export class StatusSuccessResponseDto extends SuccessResponseDto implements JSONLike<StatusSuccessResponse> {
  @ApiProperty({ type: 'null' })
  data: null = null;
}
