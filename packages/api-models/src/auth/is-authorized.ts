import * as zod from 'zod';

import { getSuccessResponseSchema } from '../common/success-response';

export const isAuthorizedResponseSchema = getSuccessResponseSchema(zod.object({ isAuthorized: zod.boolean() }));
export type IsAuthorizedResponse = zod.infer<typeof isAuthorizedResponseSchema>;
