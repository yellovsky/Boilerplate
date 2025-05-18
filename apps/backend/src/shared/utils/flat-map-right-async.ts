import * as Either from 'effect/Either';

export const flatMapRightAsync = async <R, L, R2, L2>(
  either: Either.Either<R, L>,
  fn: (value: R) => Promise<Either.Either<R2, L2>>
): Promise<Either.Either<R2, L | L2>> => {
  return Either.isRight(either) ? await fn(either.right) : (either as Either.Either<never, L>);
};
