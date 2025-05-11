import * as zod from 'zod';

import { statusSuccessResponseSchema } from '../common/success-response';

export const loginWithEmailBodySchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(1),
});

export type LoginWithEmailBody = zod.infer<typeof loginWithEmailBodySchema>;

export const loginWithEmailResponseSchema = statusSuccessResponseSchema;
export type LoginWithEmailResponse = zod.infer<typeof statusSuccessResponseSchema>;
