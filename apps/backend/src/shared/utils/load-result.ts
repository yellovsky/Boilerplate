import type { Either } from 'effect/Either';

export enum SkippedReason {
  WRONG_INPUT = 0,
  INSUFFICIENT_DATA = 1,
  INVALID_DATA = 2,
  ACCESS_DENIED = 3,
}

export interface SkippedResult {
  reason: SkippedReason;
  message?: string;
}

export type LoadResult<T> = Either<T, SkippedResult>;
