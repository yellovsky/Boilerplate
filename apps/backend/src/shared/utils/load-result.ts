import type * as Either from 'effect/Either';

export enum SkippedReason {
  WRONG_INPUT = 'WRONG_INPUT',
  INSUFFICIENT_DATA = 'INSUFFICIENT_DATA',
  INVALID_DATA = 'INVALID_DATA',
  ACCESS_DENIED = 'ACCESS_DENIED',
}

export interface SkippedResult {
  reason: SkippedReason;
  message?: string;
}

// TODO remove
export type SkippedOr<T> = Either.Either<T, SkippedResult>;
