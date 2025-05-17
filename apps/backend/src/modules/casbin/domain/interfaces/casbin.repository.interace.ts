import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { SkippedOr } from 'src/shared/utils/load-result';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { PermissionPolicyEntity, PermissionPolicyEntityData } from '../entities/permission-policy.entity';

export interface FindManyPoliciesParams {
  page: { limit: number; offset: number };
}

export type CreatePolicyData = PermissionPolicyEntityData;

export interface CasbinRepository {
  getTotal(txCtx: TxRequestContext, params: FindManyPoliciesParams): Promise<number>;

  findManyPolicies(
    txCtx: TxRequestContext,
    params: FindManyPoliciesParams
  ): Promise<SkippedOr<PermissionPolicyEntity>[]>;

  createPolicy(txCtx: TxRequestContext, data: CreatePolicyData): Promise<PermissionPolicyEntity>;
}

export const CASBIN_REPO = 'CASBIN_REPO' as InjectableIdentifier<CasbinRepository>;
