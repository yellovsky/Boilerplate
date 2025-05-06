import * as zod from 'zod';

import { isoDateSchema } from '../common/iso-date';
import { seoSchema } from '../common/seo';
import { uuidSchema } from '../common/uuid';

export const workoutSchema = zod.object({
  createdAt: isoDateSchema,
  id: uuidSchema,
  name: zod.string().min(1),
  seo: seoSchema,
  slug: zod.string().min(1),
});

export type Workout = zod.infer<typeof workoutSchema>;
