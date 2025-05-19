import * as Either from 'effect/Either';
import { vi } from 'vitest';

import { flatMapRightAsync } from './flat-map-right-async';

describe('flatMapRightAsync', () => {
  it('should map Right to another Right', async () => {
    const input = Either.right(10);
    const fn = vi.fn(async (v: number) => Either.right(v * 2));

    const result = await flatMapRightAsync(input, fn);

    expect(result).toEqual(Either.right(20));
    expect(fn).toHaveBeenCalledWith(10);
  });

  it('should map Right to a Left', async () => {
    const input = Either.right(10);
    const fn = vi.fn(async (_v: number) => Either.left('error'));

    const result = await flatMapRightAsync(input, fn);

    expect(result).toEqual(Either.left('error'));
    expect(fn).toHaveBeenCalledWith(10);
  });

  it('should return original Left without calling fn', async () => {
    const input = Either.left('original error');
    const fn = vi.fn();

    const result = await flatMapRightAsync(input, fn);

    expect(result).toEqual(Either.left('original error'));
    expect(fn).not.toHaveBeenCalled();
  });

  it('should propagate errors thrown by fn', async () => {
    const input = Either.right(42);
    const fn = vi.fn(async () => {
      throw new Error('fail');
    });

    await expect(flatMapRightAsync(input, fn)).rejects.toThrow('fail');
  });
});
