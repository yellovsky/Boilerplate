import * as zod from 'zod';

import { isoDateSchema } from '../common/iso-date';
import { localeSchema } from '../common/locale';
import { uuidSchema } from '../common/uuid';

export const shortWorkoutSchema = zod.object({
  createdAt: isoDateSchema,
  id: uuidSchema,
  languageCode: localeSchema,
  name: zod.string().min(1),
  slug: zod.string().min(1),
});
export type ShortWorkout = zod.infer<typeof shortWorkoutSchema>;
