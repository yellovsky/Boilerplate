// FIXME Move to domain folder
import { type HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import type { TFunction } from 'i18next';
import type { ZodError } from 'zod';

import {
  type FailedResponse,
  type FailedResponseError,
  type FailedResponseErrorCode,
  type FailedResponseErrorDetail,
  failedResponseErrorCodeSchema,
  ISODate,
} from '@repo/api-models';

import type { JSONLike } from 'src/shared/utils/json-like';
import { getZodIssueDetails } from 'src/shared/utils/zod-issue-details';

const getErrorCodeFromHttpException = (exception: HttpException): [HttpStatus, FailedResponseErrorCode] => {
  switch (exception.getStatus()) {
    case HttpStatus.NOT_FOUND:
      return [HttpStatus.NOT_FOUND, 'not_found'];

    case HttpStatus.BAD_REQUEST:
      return [HttpStatus.BAD_REQUEST, 'bad_request'];

    case HttpStatus.FORBIDDEN:
      return [HttpStatus.FORBIDDEN, 'forbidden'];

    case HttpStatus.UNAUTHORIZED:
      return [HttpStatus.UNAUTHORIZED, 'unauthorized'];

    default:
      return [HttpStatus.INTERNAL_SERVER_ERROR, 'unknown_error'];
  }
};

class FailureResponseErrorDetailDto implements JSONLike<FailedResponseErrorDetail> {
  @ApiProperty({ description: 'Field with error name', type: String })
  field: string;

  @ApiProperty({ description: 'Field error message', type: String })
  message: string;

  static from(data: FailedResponseErrorDetail): FailureResponseErrorDetailDto {
    return new FailureResponseErrorDetailDto(data.field, data.message);
  }

  constructor(field: string, message: string) {
    this.field = field;
    this.message = message;
  }
}

interface FailureResponseErrorDtoData extends Omit<FailedResponseError, 'timestamp'> {
  timestamp: string | Date | number | ISODate;
}

class FailureResponseErrorDto implements JSONLike<FailedResponseError> {
  @ApiProperty({
    description: 'Response code',
    enum: failedResponseErrorCodeSchema.options.map((s) => s.value),
    type: String,
  })
  code: FailedResponseErrorCode;

  @ApiProperty({ description: 'Response status code', type: Number })
  httpCode: number;

  @ApiProperty({ description: 'Response error message', type: String })
  message: string;

  @ApiProperty({ description: 'Error timestamp in ISO format', type: String })
  timestamp: ISODate;

  @ApiProperty({ description: 'Error details', type: [FailureResponseErrorDetailDto] })
  details?: Array<{ field: string; message: string }>;

  static from(data: FailureResponseErrorDtoData): FailureResponseErrorDto {
    const timestamp: ISODate =
      data.timestamp instanceof ISODate
        ? data.timestamp
        : typeof data.timestamp === 'string'
          ? ISODate.fromString(data.timestamp)
          : ISODate.fromDate(new Date(data.timestamp));

    return new FailureResponseErrorDto(data.code, data.httpCode, data.message, timestamp, data.details);
  }

  constructor(
    code: FailedResponseErrorCode,
    httpCode: number,
    message: string,
    timestamp: ISODate,
    details?: Array<{ field: string; message: string }>
  ) {
    this.code = code;
    this.httpCode = httpCode;
    this.message = message;
    this.timestamp = timestamp;
    this.details = details;
  }
}

export class FailedResponseDto implements JSONLike<FailedResponse> {
  @ApiProperty({ enum: ['error'], type: String })
  status: 'error' = 'error' as const;

  @ApiProperty({ description: 'Failed response error', type: FailureResponseErrorDto })
  error: FailureResponseErrorDto;

  static from(data: FailureResponseErrorDtoData): FailedResponseDto {
    return new FailedResponseDto(FailureResponseErrorDto.from(data));
  }

  static fromHttpException(exception: HttpException): FailedResponseDto {
    const [httpCode, code] = getErrorCodeFromHttpException(exception);

    return FailedResponseDto.from({
      code,
      httpCode: httpCode,
      message: exception.message,
      timestamp: new Date(),
    });
  }

  static fromZodError(t: TFunction, error: ZodError): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'bad_request',
      details: error.issues.map(getZodIssueDetails(t)),
      httpCode: 400,
      // TODO: Add normal string message
      message: error.toString(),
      timestamp: new Date(),
    });
  }

  static unknown(): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'unknown_error',
      httpCode: 500,
      message: 'Unknown error',
      timestamp: Date.now(),
    });
  }

  constructor(error: FailureResponseErrorDto) {
    this.error = error;
  }
}
