import type { FailedResponseDto } from 'src/shared/presentation/dtos/failure-response.dto';

export abstract class DomainError extends Error {
  abstract toFailedResponseDto(): FailedResponseDto;
}
