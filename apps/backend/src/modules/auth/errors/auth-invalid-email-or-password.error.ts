import { HttpStatus } from '@nestjs/common';

import { FailedResponseDto } from 'src/shared/dto/failure-response.dto';
import { DomainError } from 'src/shared/errors/domain-error';

export class AuthInvalidEmailOrPasswordError extends DomainError {
  toFailedResponseDto(): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'bad_request',

      details: [
        { field: 'email', message: 'Invalid email' },
        { field: 'password', message: 'Invalid password' },
      ],
      httpCode: HttpStatus.BAD_REQUEST,
      message: 'Invalid email or password',
      timestamp: new Date(),
    });
  }
}
