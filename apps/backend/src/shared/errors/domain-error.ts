import type { FailedResponseDto } from 'src/shared/dto/failure-response.dto';

export abstract class DomainError extends Error {
  abstract toFailedResponseDto(): FailedResponseDto;
}
