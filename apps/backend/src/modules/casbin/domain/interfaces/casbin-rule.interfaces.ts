import { type PermissionPolicyAction, permissionPolicyActionSchema } from '@repo/api-models';

export type CasbinSubject = string;
export type CasbinObjectType = string;

export type CasbinAction = PermissionPolicyAction;
export const isCasbinAction = (val: unknown): val is CasbinAction =>
  permissionPolicyActionSchema.safeParse(val).success;
