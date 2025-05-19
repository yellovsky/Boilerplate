import { ISODate } from '@repo/api-models';

import type { CasbinAction, CasbinObjectType, CasbinSubject } from '../interfaces/casbin-rule.interfaces';

export interface PermissionPolicyEntityData {
  id: string;
  objectType: CasbinObjectType;
  subject: CasbinSubject;
  action: CasbinAction;
  condition: string | null;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class PermissionPolicyEntity {
  static from(data: PermissionPolicyEntityData): PermissionPolicyEntity {
    return new PermissionPolicyEntity(
      data.id,
      data.objectType,
      data.subject,
      data.action,
      data.condition,
      ISODate.fromDate(data.createdAt),
      ISODate.fromDate(data.updatedAt),
      data.note
    );
  }

  constructor(
    public readonly id: string,
    public readonly objectType: CasbinObjectType,
    public readonly subject: CasbinSubject,
    public readonly action: CasbinAction,
    public readonly condition: string | null,
    public readonly createdAt: ISODate,
    public readonly updatedAt: ISODate,
    public readonly note: string | null = null
  ) {}
}
