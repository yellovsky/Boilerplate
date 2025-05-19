import * as Either from 'effect/Either';

export const applyPromiseToRights = async <T, E1, E2>(
  input: Either.Either<T, E1>[],
  fn: (values: T[]) => Promise<Either.Either<T, E2>[]>
): Promise<Either.Either<T, E1 | E2>[]> => {
  const rightItems: { index: number; value: T }[] = [];

  // Collect all Right values with original indexes
  input.forEach((item, index) => {
    if (Either.isRight(item)) rightItems.push({ index, value: item.right });
  });

  const valuesToProcess = rightItems.map((r) => r.value);
  const processedRights = await fn(valuesToProcess);

  // Sanity check: output length should match inputs
  if (processedRights.length !== rightItems.length) {
    throw new Error('Effect result length mismatch');
  }

  const output: Either.Either<T, E1 | E2>[] = [...input];

  rightItems.forEach(({ index }, i) => {
    output[index] = processedRights[i];
  });

  return output;
};
