import { Enforcer } from 'casbin';

import { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import { LoadResult } from 'src/shared/utils/load-result';
import { AuthRequestContext, RequestContext } from 'src/shared/utils/request-context';

import { PermissionPolicyEntity } from '../entities/permission-policy.entity';

import { CasbinAction, CasbinObjectType, CasbinSubject } from './casbin-rule.interfaces';

export interface GetPoliciesListParams {
  page: { limit: number; offset: number };
}

export interface CasbinService {
  getEnforcer(): Enforcer;

  checkRequestPermission(
    reqCtx: AuthRequestContext,
    action: CasbinAction,
    objType: CasbinObjectType,
    obj: object,
  ): Promise<boolean>;

  checkPermission(
    sub: CasbinSubject,
    action: CasbinAction,
    objType: CasbinObjectType,
    obj: object,
  ): Promise<boolean>;

  getManyPolicies(
    reqCtx: RequestContext,
    params: GetPoliciesListParams,
  ): Promise<LoadResult<PermissionPolicyEntity>[]>;

  getPoliciesTotal(reqCtx: RequestContext, params: GetPoliciesListParams): Promise<number>;

  getManyPoliciesWithTotal(
    reqCtx: RequestContext,
    params: GetPoliciesListParams,
  ): Promise<{ items: LoadResult<PermissionPolicyEntity>[]; total: number }>;
}

export const CASBIN_SRV = 'CASBIN_SRV' as InjectableIdentifier<CasbinService>;
