import { HttpStatus } from '@nestjs/common';

import { FailedResponseDto } from 'src/shared/dto/failure-response.dto';
import { DomainError } from 'src/shared/errors/domain-error';

export class AuthInvalidTokenError extends DomainError {
  toFailedResponseDto(): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'invalid_access_token',
      httpCode: HttpStatus.UNAUTHORIZED,
      message: 'Invalid access token',
      timestamp: new Date(),
    });
  }
}
