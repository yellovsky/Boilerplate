import { ApiProperty } from '@nestjs/swagger';

import type { IsAuthorizedResponse } from '@repo/api-models';

import { SuccessResponseDto } from 'src/shared/dto/success-response.dto';

class IsAuthorizedResponseDataDto {
  @ApiProperty({ description: 'Is user authorized flag', type: Boolean })
  isAuthorized: boolean;

  constructor(isAuthorized: boolean) {
    this.isAuthorized = isAuthorized;
  }
}

export class IsAuthorizedResponseDto extends SuccessResponseDto implements IsAuthorizedResponse {
  @ApiProperty({ type: IsAuthorizedResponseDataDto })
  data: IsAuthorizedResponseDataDto;

  constructor(isAuthorized: boolean) {
    super();

    this.data = new IsAuthorizedResponseDataDto(isAuthorized);
  }
}
