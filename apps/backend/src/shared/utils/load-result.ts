import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as Either from 'effect/Either';

export enum SkippedReason {
  WRONG_INPUT = 'WRONG_INPUT',
  INSUFFICIENT_DATA = 'INSUFFICIENT_DATA',
  INVALID_DATA = 'INVALID_DATA',
  ACCESS_DENIED = 'ACCESS_DENIED',
  NOT_PUBLISHED = 'NOT_PUBLISHED',
  NOT_FOUND = 'NOT_FOUND',
}

export interface SkippedResult {
  reason: SkippedReason;
  message?: string;
}

export type SkippedOr<T> = Either.Either<T, SkippedResult>;

export const unwrapOrThrowSkipped = <TData>(skippedOr: SkippedOr<TData>): TData => {
  if (Either.isRight(skippedOr)) return skippedOr.right;

  switch (skippedOr.left.reason) {
    case SkippedReason.NOT_FOUND:
      throw new NotFoundException();

    // TODO maybe it's 500 error
    case SkippedReason.WRONG_INPUT:
      throw new BadRequestException();

    case SkippedReason.ACCESS_DENIED:
      throw new ForbiddenException();

    default:
      throw new InternalServerErrorException();
  }
};
