import type { LoginWithEmailResponse } from '@repo/api-models';

import { StatusSuccessResponseDto } from 'src/shared/dto/status-success-response.dto';

export class LoginWithEmailResponseDto extends StatusSuccessResponseDto implements LoginWithEmailResponse {}
