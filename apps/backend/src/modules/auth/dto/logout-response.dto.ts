import type { LogoutResponse } from '@repo/api-models';

import { StatusSuccessResponseDto } from 'src/shared/dto/status-success-response.dto';

export class LogoutResponseDto extends StatusSuccessResponseDto implements LogoutResponse {}
