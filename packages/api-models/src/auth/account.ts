import * as zod from 'zod';

import { getSuccessResponseSchema } from '../common/success-response';
import { uuidSchema } from '../common/uuid';

export const accountSchema = zod.object({
  email: zod.string().email(),
  id: uuidSchema,
});
export type Account = zod.infer<typeof accountSchema>;

export const accountResponseSchema = getSuccessResponseSchema(accountSchema);
export type AccountResponse = zod.infer<typeof accountResponseSchema>;
