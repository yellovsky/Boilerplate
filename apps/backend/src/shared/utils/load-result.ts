export enum SkippedReason {
  WRONG_INPUT,
  INSUFFICIENT_DATA,
  INVALID_DATA,
  ACCESS_DENIED,
}

// TODO It looks like Either monad
export type LoadResult<T> =
  | { type: 'ok'; data: T }
  | { type: 'skipped'; reason: SkippedReason; message?: string };
