import * as zod from 'zod';

import { localeSchema } from '../common/locale';
import { pageRequestSchema } from '../common/page-request';
import { getItemsWithPaginationSchema, getSuccessResponseSchema } from '../common/success-response';
import { permissionPolicySchema } from './permission-policy';

export const getManyPermissionPoliciesQuerySchema = zod.object({
  locale: localeSchema,
  page: pageRequestSchema,
});
export type GetManyPermissionPoliciesQuery = zod.infer<typeof getManyPermissionPoliciesQuerySchema>;

export const getManyPermissionPoliciesResponseSchema = getSuccessResponseSchema(
  getItemsWithPaginationSchema(permissionPolicySchema)
);
export type GetManyPermissionPoliciesResponse = zod.infer<typeof getManyPermissionPoliciesResponseSchema>;
