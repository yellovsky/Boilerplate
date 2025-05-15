import * as zod from 'zod';

export const numericStringSchema = zod.string().transform((val, ctx) => {
  const parsed = Number(val);
  if (Number.isNaN(parsed)) {
    ctx.addIssue({
      code: zod.ZodIssueCode.custom,
      message: 'Expected a string containing a number',
    });
    return zod.NEVER;
  }
  return parsed;
});
