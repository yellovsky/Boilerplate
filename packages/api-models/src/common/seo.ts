import * as zod from 'zod';

export const seoSchema = zod.object({
  description: zod.string().nullable(),
  keywords: zod.string().nullable(),
  title: zod.string().nullable(),
});

export type Seo = zod.infer<typeof seoSchema>;
