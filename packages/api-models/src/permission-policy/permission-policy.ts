import * as zod from 'zod';

import { isoDateSchema } from '../common/iso-date';
import { uuidSchema } from '../common/uuid';

export const permissionPolicyActionSchema = zod.union([
  zod.literal('view').describe('View (request) entities'),
  zod.literal('view_cms').describe('View (request) cms entities'),
  zod.literal('read').describe('Read one entity'),
  zod.literal('read_cms').describe('Read one cms entity'),
  zod.literal('create').describe('Create entity'),
  zod.literal('update').describe('Update entity'),
  zod.literal('delete').describe('Delete entity'),
]);
export type PermissionPolicyAction = zod.infer<typeof permissionPolicyActionSchema>;

export const permissionPolicySchema = zod.object({
  action: permissionPolicyActionSchema,
  condition: zod.string().nullable(),
  createdAt: isoDateSchema,
  id: uuidSchema,
  note: zod.string().nullable(),
  objectType: zod.string().min(1),
  subject: zod.string().min(1),
  updatedAt: isoDateSchema,
});
export type PermissionPolicy = zod.infer<typeof permissionPolicySchema>;
