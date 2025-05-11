import * as zod from 'zod';

export const getSuccessResponseSchema = <TValueSchema extends zod.ZodType>(
  dataSchema: TValueSchema,
) =>
  zod.object({
    data: dataSchema,
    status: zod.literal('success'),
  });

export type SuccessResponse<TData> = ReturnType<
  typeof getSuccessResponseSchema<zod.ZodType<TData>>
>;

export const responsePaginationSchema = zod.object({
  count: zod.number(),
  limit: zod.number(),
  offset: zod.number(),
  total: zod.number(),
});

export type ResponsePagination = zod.infer<typeof responsePaginationSchema>;

export const getItemsWithPaginationSchema = <TItem>(itemSchema: zod.ZodType<TItem>) =>
  zod.object({
    items: itemSchema.array(),
    pagination: responsePaginationSchema,
  });
export type ItemsWithPagination<TItem> = ReturnType<
  typeof getSuccessResponseSchema<zod.ZodType<TItem>>
>;

export const statusSuccessResponseSchema = getSuccessResponseSchema(zod.null());
export type StatusSuccessResponse = zod.infer<typeof statusSuccessResponseSchema>;
