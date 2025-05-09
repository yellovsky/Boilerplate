import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty({ enum: ['success'], type: String })
  status: 'success' = 'success' as const;
}
