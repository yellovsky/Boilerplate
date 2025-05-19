import * as Either from 'effect/Either';

import { applyPromiseToRights } from './apply-promise-to-rights';

describe('applyPromiseToRights', () => {
  it('should process all Right values and return updated results', async () => {
    const input = [Either.right(1), Either.right(2), Either.right(3)];

    const fn = async (values: number[]) => values.map((v) => Either.right(v * 10));

    const result = await applyPromiseToRights(input, fn);

    expect(result).toEqual([Either.right(10), Either.right(20), Either.right(30)]);
  });

  it('should return original Left values unchanged', async () => {
    const input = [Either.left('e1'), Either.left('e2')];

    const fn = async () => []; // Should never be called
    const result = await applyPromiseToRights(input, fn);

    expect(result).toEqual(input);
  });

  it('should preserve Lefts and update Rights', async () => {
    const input = [Either.left('e1'), Either.right(2), Either.left('e2'), Either.right(4)];

    const fn = async (values: number[]) => values.map((v) => Either.right(v * 2));

    const result = await applyPromiseToRights(input, fn);

    expect(result).toEqual([Either.left('e1'), Either.right(4), Either.left('e2'), Either.right(8)]);
  });

  it('should throw if fn returns a result with length mismatch', async () => {
    const input = [Either.right(1), Either.right(2)];

    const fn = async () => [Either.right(10)]; // Only 1 item instead of 2

    await expect(() => applyPromiseToRights(input, fn)).rejects.toThrow('Effect result length mismatch');
  });

  it('should handle fn converting Rights into Lefts', async () => {
    const input = [Either.right(1), Either.right(2)];

    const fn = async (values: number[]) => values.map((v) => (v === 1 ? Either.left('e2') : Either.right(v * 10)));

    const result = await applyPromiseToRights(input, fn);

    expect(result).toEqual([Either.left('e2'), Either.right(20)]);
  });
});
