import * as zod from 'zod';

export const localeSchema = zod.string();
export type Locale = zod.infer<typeof localeSchema>;
