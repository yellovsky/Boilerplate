import { HttpStatus } from '@nestjs/common';

import { DomainError } from 'src/shared/domain/errors/domain-error';
import { FailedResponseDto } from 'src/shared/presentation/dtos/failure-response.dto';

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
