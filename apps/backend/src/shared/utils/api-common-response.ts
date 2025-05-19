import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import type { FailedResponse } from '@repo/api-models';

import { FailedResponseDto } from '../dto/failure-response.dto';

export const ApiCommonErrorResponses = (
  ...types: Array<'forbidden' | 'unauthorized' | 'bad_request' | 'not_found'>
) => {
  return applyDecorators(
    ...[
      types.includes('not_found')
        ? ApiNotFoundResponse({
            description: 'Not found',
            example: {
              error: {
                code: 'not_found',
                httpCode: 404,
                message: 'Not found',
                timestamp: '2025-05-06T10:44:08.087Z',
              },
              status: 'error',
            } satisfies FailedResponse,
            type: FailedResponseDto,
          })
        : null,
      types.includes('bad_request')
        ? ApiBadRequestResponse({
            description: 'Bad request',
            example: {
              error: {
                code: 'bad_request',
                details: [
                  { field: 'field1', message: 'Field is required' },
                  { field: 'field2', message: 'Value must be a positive number' },
                ],
                httpCode: 400,
                message: 'Bad request',
                timestamp: '2025-05-06T10:44:08.087Z',
              },
              status: 'error',
            } satisfies FailedResponse,
            type: FailedResponseDto,
          })
        : null,
      types.includes('forbidden')
        ? ApiForbiddenResponse({
            description: 'Forbidden',
            example: {
              error: {
                code: 'forbidden',
                httpCode: 403,
                message: 'Forbidden',
                timestamp: '2025-05-06T10:44:08.087Z',
              },
              status: 'error',
            } satisfies FailedResponse,
            type: FailedResponseDto,
          })
        : null,
      types.includes('unauthorized')
        ? ApiUnauthorizedResponse({
            description: 'Unauthorized',
            example: {
              error: {
                code: 'unauthorized',
                httpCode: 401,
                message: 'Unauthorized',
                timestamp: '2025-05-06T10:44:08.087Z',
              },
              status: 'error',
            } satisfies FailedResponse,
            type: FailedResponseDto,
          })
        : null,
      ApiInternalServerErrorResponse({
        description: 'Unknown server error',
        example: {
          error: {
            code: 'unknown_error',
            httpCode: 500,
            message: 'Unknown server error',
            timestamp: '2025-05-06T10:44:08.087Z',
          },
          status: 'error',
        } satisfies FailedResponse,
        type: FailedResponseDto,
      }),
    ].filter((r) => r !== null)
  );
};
