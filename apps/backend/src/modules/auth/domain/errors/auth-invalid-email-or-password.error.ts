import { HttpStatus } from '@nestjs/common';

import { DomainError } from 'src/shared/domain/errors/domain-error';
import { FailedResponseDto } from 'src/shared/presentation/dtos/failure-response.dto';

export class AuthInvalidEmailOrPasswordError extends DomainError {
  toFailedResponseDto(): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'bad_request',
      httpCode: HttpStatus.BAD_REQUEST,
      message: 'Invalid email or password',
      timestamp: new Date(),

      details: [
        { field: 'email', message: 'Invalid email' },
        { field: 'password', message: 'Invalid password' },
      ],
    });
  }
}
