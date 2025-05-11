import { join } from 'path';
import { Enforcer, newEnforcer } from 'casbin';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { LoadResult } from 'src/shared/utils/load-result';
import { PRISMA_SRV } from 'src/modules/prisma';
import { RequestContext } from 'src/shared/utils/request-context';

import { CASBIN_REPO } from '../../domain/interfaces/casbin.repository.interace';
import { PermissionPolicyEntity } from '../../domain/entities/permission-policy.entity';

import {
  CasbinService,
  GetPoliciesListParams,
} from '../../domain/interfaces/casbin.service.interace';

import {
  CasbinAction,
  CasbinObjectType,
  CasbinSubject,
} from '../../domain/interfaces/casbin-rule.interfaces';

import { PrismaAdapter } from './prisma-adapter';

@Injectable()
export class CasbinServiceImpl implements CasbinService, OnModuleInit {
  #enforcer!: Enforcer;

  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>,

    @Inject(CASBIN_REPO)
    private readonly casbinRepo: IdentifierOf<typeof CASBIN_REPO>,
  ) {}

  async onModuleInit() {
    const adapter = await PrismaAdapter.newAdapter(this.prismaSrv);
    this.#enforcer = await newEnforcer(join(__dirname, '../../../../../../model.conf'), adapter);
    await this.#enforcer.loadPolicy();
  }

  getEnforcer(): Enforcer {
    return this.#enforcer;
  }

  checkPermission(
    sub: CasbinSubject,
    action: CasbinAction,
    objType: CasbinObjectType,
    obj: object,
  ): Promise<boolean> {
    return this.#enforcer.enforce(sub || 'public', action, objType, obj);
  }

  getManyPolicies(
    reqCtx: RequestContext,
    params: GetPoliciesListParams,
  ): Promise<LoadResult<PermissionPolicyEntity>[]> {
    return this.casbinRepo.findManyPolicies(reqCtx, params);
  }

  getPoliciesTotal(reqCtx: RequestContext, params: GetPoliciesListParams): Promise<number> {
    return this.casbinRepo.getTotal(reqCtx, params);
  }

  async getManyPoliciesWithTotal(
    reqCtx: RequestContext,
    params: GetPoliciesListParams,
  ): Promise<{ items: LoadResult<PermissionPolicyEntity>[]; total: number }> {
    return {
      items: await this.getManyPolicies(reqCtx, params),
      total: await this.getPoliciesTotal(reqCtx, params),
    };
  }

  checkRequestPermission(
    reqCtx: RequestContext,
    action: CasbinAction,
    objType: CasbinObjectType,
    obj: object,
  ): Promise<boolean> {
    return this.checkPermission(reqCtx.profileId || 'public', action, objType, obj);
  }
}
