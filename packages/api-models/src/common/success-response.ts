import * as zod from 'zod';

export const getSuccessResponseSchema = <TValueSchema extends zod.ZodType>(dataSchema: TValueSchema) =>
  zod.object({
    data: dataSchema,
    status: zod.literal('success'),
  });

export type SuccessResponse<TData> = zod.infer<ReturnType<typeof getSuccessResponseSchema<zod.ZodType<TData>>>>;

export const responsePaginationSchema = zod.object({
  limit: zod.number(),
  offset: zod.number(),
  skipped: zod.number().int().nonnegative().array(),
  total: zod.number(),
});

export type ResponsePagination = zod.infer<typeof responsePaginationSchema>;

export const getItemsWithPaginationSchema = <TItem>(itemSchema: zod.ZodType<TItem>) =>
  zod.object({
    items: itemSchema.array(),
    pagination: responsePaginationSchema,
  });
export type ItemsWithPagination<TItem> = zod.infer<ReturnType<typeof getItemsWithPaginationSchema<TItem>>>;

export const statusSuccessResponseSchema = getSuccessResponseSchema(zod.null());
export type StatusSuccessResponse = zod.infer<typeof statusSuccessResponseSchema>;
