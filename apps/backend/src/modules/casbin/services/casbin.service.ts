import { join } from 'node:path';

import { Inject, Injectable, type OnModuleInit } from '@nestjs/common';
import { type Enforcer, newEnforcer } from 'casbin';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { SkippedOr } from 'src/shared/utils/load-result';
import type { AuthRequestContext, RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import type { PermissionPolicyEntity } from '../entities/permission-policy.entity';
import { CASBIN_REPO } from '../interfaces/casbin.repository.interace';
import type { CasbinService, GetPoliciesListParams } from '../interfaces/casbin.service.interace';
import type { CasbinAction, CasbinObjectType, CasbinSubject } from '../interfaces/casbin-rule.interfaces';
import { PrismaAdapter } from './prisma-adapter';

@Injectable()
export class CasbinServiceImpl implements CasbinService, OnModuleInit {
  #enforcer!: Enforcer;

  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>,

    @Inject(CASBIN_REPO)
    private readonly casbinRepo: IdentifierOf<typeof CASBIN_REPO>
  ) {}

  async onModuleInit() {
    const adapter = await PrismaAdapter.newAdapter(this.prismaSrv);
    this.#enforcer = await newEnforcer(join(__dirname, '../../../../../model.conf'), adapter);
    await this.#enforcer.loadPolicy();
  }

  getEnforcer(): Enforcer {
    return this.#enforcer;
  }

  checkPermission(sub: CasbinSubject, action: CasbinAction, objType: CasbinObjectType, obj: object): Promise<boolean> {
    return this.#enforcer.enforce(sub || 'public', action, objType, obj);
  }

  getManyPolicies(reqCtx: RequestContext, params: GetPoliciesListParams): Promise<SkippedOr<PermissionPolicyEntity>[]> {
    return this.casbinRepo.findManyPolicies(reqCtx, params);
  }

  getPoliciesTotal(reqCtx: RequestContext, params: GetPoliciesListParams): Promise<number> {
    return this.casbinRepo.getTotal(reqCtx, params);
  }

  async getManyPoliciesWithTotal(
    reqCtx: RequestContext,
    params: GetPoliciesListParams
  ): Promise<{ items: SkippedOr<PermissionPolicyEntity>[]; total: number }> {
    return {
      items: await this.getManyPolicies(reqCtx, params),
      total: await this.getPoliciesTotal(reqCtx, params),
    };
  }

  checkRequestPermission(
    reqCtx: AuthRequestContext,
    action: CasbinAction,
    objType: CasbinObjectType,
    obj: object
  ): Promise<boolean> {
    return this.checkPermission(reqCtx.profileId || 'public', action, objType, obj);
  }
}
