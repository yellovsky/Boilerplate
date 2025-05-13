import { Either } from 'effect/Either';

export enum SkippedReason {
  WRONG_INPUT,
  INSUFFICIENT_DATA,
  INVALID_DATA,
  ACCESS_DENIED,
}

export interface SkippedResult {
  reason: SkippedReason;
  message?: string;
}

export type LoadResult<T> = Either<T, SkippedResult>;
