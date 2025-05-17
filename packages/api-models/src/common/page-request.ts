import * as zod from 'zod';

import { numericStringSchema } from './numeric-string';

export const pageRequestSchema = zod.object({
  limit: zod.union([numericStringSchema, zod.number().int().positive()]),
  offset: zod.union([numericStringSchema, zod.number().int().nonnegative()]),
});

export type PageRequest = zod.infer<typeof pageRequestSchema>;
