import type { Either } from 'effect/Either';

import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { SkippedResult } from 'src/shared/utils/load-result';
import type { AuthRequestContext } from 'src/shared/utils/request-context';

import type { PermissionPolicyEntity } from 'src/modules/casbin/domain/entities/permission-policy.entity';

export interface PermissionPoliciesAccessControlService {
  checkCanViewPermissionPololicy(reqCtx: AuthRequestContext): Promise<boolean>;
  filterCanReadPermissionPololicy(
    reqCtx: AuthRequestContext,
    entity: PermissionPolicyEntity
  ): Promise<Either<PermissionPolicyEntity, SkippedResult>>;
}
export const PERMISSION_POLICY_ACCESS_CONTROL_SRV =
  'PERMISSION_POLICY_ACCESS_CONTROL_SRV' as InjectableIdentifier<PermissionPoliciesAccessControlService>;
