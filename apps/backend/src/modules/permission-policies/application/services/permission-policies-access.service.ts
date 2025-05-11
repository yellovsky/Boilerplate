import { Inject, Injectable } from '@nestjs/common';

import { AuthRequestContext } from 'src/shared/utils/request-context';
import { CASBIN_SRV } from 'src/modules/casbin';
import { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { PermissionPolicyEntity } from 'src/modules/casbin/domain/entities/permission-policy.entity';

import { PermissionPoliciesAccessControlService } from '../../domain/interfaces/permission-policies-access.service.interface';

@Injectable()
export class PermissionPoliciesAccessControlServiceImpl
  implements PermissionPoliciesAccessControlService
{
  constructor(
    @Inject(CASBIN_SRV)
    private readonly casbinSrv: IdentifierOf<typeof CASBIN_SRV>,
  ) {}

  async checkCanViewPermissionPololicy(reqCtx: AuthRequestContext): Promise<boolean> {
    if (!reqCtx.isAuthorized()) return false;
    return this.casbinSrv.checkRequestPermission(reqCtx, 'view', 'permission_policy', {});
  }

  async filterCanReadPermissionPololicy(
    reqCtx: AuthRequestContext,
    entity: PermissionPolicyEntity,
  ): Promise<PermissionPolicyEntity | null> {
    const canRead = this.casbinSrv.checkRequestPermission(
      reqCtx,
      'read',
      'permission_policy',
      entity,
    );

    return !canRead ? null : entity;
  }
}
