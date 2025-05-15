import type * as zod from 'zod';

import { statusSuccessResponseSchema } from '../common/success-response';

export const logoutResponseSchema = statusSuccessResponseSchema;
export type LogoutResponse = zod.infer<typeof logoutResponseSchema>;
