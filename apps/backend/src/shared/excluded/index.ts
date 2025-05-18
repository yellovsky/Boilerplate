import { Data, type Either } from 'effect';

import { FailedResponseDto } from '../presentation/dtos/failure-response.dto';

enum ExclusionReasonKind {
  NOT_FOUND = 'NOT_FOUND',
  ACCESS_DENIED = 'ACCESS_DENIED',
  NOT_PUBLISHED = 'NOT_PUBLISHED',
  INSUFFICIENT_DATA_TO_TRANSLATE = 'INSUFFICIENT_DATA_TO_TRANSLATE',
}

interface ReasonMeta {
  httpMessage?: string;
  message?: string;
}

type ReasonParams = ReasonMeta & { reason: ExclusionReasonKind };

abstract class ExclusionReason extends Data.TaggedClass('ExclusionReason')<ReasonParams> {
  abstract toFailedResponseDto(): FailedResponseDto;
}

export class NotFoundReason extends ExclusionReason {
  constructor(params?: ReasonMeta) {
    super({ ...params, reason: ExclusionReasonKind.NOT_FOUND });
  }

  toFailedResponseDto(): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'not_found',
      httpCode: 404,
      message: this.httpMessage || 'Not found',
      timestamp: Date.now(),
    });
  }
}

export class AccessDeniedReason extends ExclusionReason {
  constructor(params?: ReasonMeta) {
    super({ ...params, reason: ExclusionReasonKind.ACCESS_DENIED });
  }

  toFailedResponseDto(): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'forbidden',
      httpCode: 403,
      message: this.httpMessage || 'Access denied',
      timestamp: Date.now(),
    });
  }
}

export class NotPublishedReason extends ExclusionReason {
  constructor(params?: ReasonMeta) {
    super({ ...params, reason: ExclusionReasonKind.NOT_PUBLISHED });
  }

  toFailedResponseDto(): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'not_found',
      httpCode: 404,
      message: this.httpMessage || 'Not published',
      timestamp: Date.now(),
    });
  }
}

export class TranslationDataMissingReason extends ExclusionReason {
  constructor(params?: ReasonMeta) {
    super({ ...params, reason: ExclusionReasonKind.INSUFFICIENT_DATA_TO_TRANSLATE });
  }

  toFailedResponseDto(): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'not_found',
      httpCode: 404,
      message: this.httpMessage || 'Insufficient data to translate',
      timestamp: Date.now(),
    });
  }
}

// The Either variant
export type ResultOrExcluded<T> = Either.Either<T, ExclusionReason>;
