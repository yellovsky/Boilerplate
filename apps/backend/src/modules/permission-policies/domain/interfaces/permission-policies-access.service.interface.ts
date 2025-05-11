import { AuthRequestContext } from 'src/shared/utils/request-context';
import { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import { PermissionPolicyEntity } from 'src/modules/casbin/domain/entities/permission-policy.entity';

export interface PermissionPoliciesAccessControlService {
  checkCanViewPermissionPololicy(reqCtx: AuthRequestContext): Promise<boolean>;
  filterCanReadPermissionPololicy(
    reqCtx: AuthRequestContext,
    entity: PermissionPolicyEntity,
  ): Promise<PermissionPolicyEntity | null>;
}
export const PERMISSION_POLICY_ACCESS_CONTROL_SRV =
  'PERMISSION_POLICY_ACCESS_CONTROL_SRV' as InjectableIdentifier<PermissionPoliciesAccessControlService>;
