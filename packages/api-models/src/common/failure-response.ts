import * as zod from 'zod';

import { isoDateSchema } from './iso-date';

export const failedResponseErrorCodeSchema = zod.union([
  zod.literal('unknown_error'),
  zod.literal('not_found'),
  zod.literal('bad_request'),
  zod.literal('forbidden'),
  zod.literal('unauthorized'),
  zod.literal('invalid_access_token'),
]);
export type FailedResponseErrorCode = zod.infer<typeof failedResponseErrorCodeSchema>;

export const failedResponseErrorDetailSchema = zod.object({
  field: zod.string(),
  message: zod.string(),
});
export type FailedResponseErrorDetail = zod.infer<typeof failedResponseErrorDetailSchema>;

export const failedResponseErrorSchema = zod.object({
  code: failedResponseErrorCodeSchema,
  details: failedResponseErrorDetailSchema.array().optional(),
  httpCode: zod.number(),
  message: zod.string(),
  timestamp: isoDateSchema,
});
export type FailedResponseError = zod.infer<typeof failedResponseErrorSchema>;

export const failedResponseSchema = zod.object({
  error: failedResponseErrorSchema,
  status: zod.literal('error'),
});
export type FailedResponse = zod.infer<typeof failedResponseSchema>;
