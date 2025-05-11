import { CasbinRule, Prisma } from '@generated/prisma';
import { Inject, Injectable } from '@nestjs/common';

import { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { PRISMA_SRV } from 'src/modules/prisma';
import { TxRequestContext } from 'src/shared/utils/request-context';
import { LoadResult, SkippedReason } from 'src/shared/utils/load-result';

import { isCasbinAction } from '../../domain/interfaces/casbin-rule.interfaces';
import { PermissionPolicyEntity } from '../../domain/entities/permission-policy.entity';

import {
  CasbinRepository,
  CreatePolicyData,
  FindManyPoliciesParams,
} from '../../domain/interfaces/casbin.repository.interace';

export const makeCasbinRuleEntity = (rule: CasbinRule): LoadResult<PermissionPolicyEntity> => {
  if (rule.ptype !== 'p') {
    return { message: 'ptype must equals p', reason: SkippedReason.WRONG_INPUT, type: 'skipped' };
  }

  if (!isCasbinAction(rule.v1)) {
    return {
      message: 'rule.v1 is not a CasbinAction',
      reason: SkippedReason.INVALID_DATA,
      type: 'skipped',
    };
  }

  if (!rule.v0 || !rule.v3 || !rule.v2) {
    return {
      message: 'rule.v0, rule.v2 and rule.v3 must be not empty',
      reason: SkippedReason.INSUFFICIENT_DATA,
      type: 'skipped',
    };
  }

  return {
    data: PermissionPolicyEntity.from({
      action: rule.v1,
      condition: rule.v3,
      createdAt: rule.createdAt,
      id: rule.id,
      note: rule.note,
      objectType: rule.v2,
      subject: rule.v0,
      updatedAt: rule.updatedAt,
    }),
    type: 'ok',
  };
};

@Injectable()
export class CasbinRepositoryImpl implements CasbinRepository {
  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>,
  ) {}

  async getTotal(txCtx: TxRequestContext, params: FindManyPoliciesParams): Promise<number> {
    return (txCtx.tx || this.prismaSrv).casbinRule.count({
      where: this.#getPolicyWhere(params),
    });
  }

  async findManyPolicies(
    txCtx: TxRequestContext,
    params: FindManyPoliciesParams,
  ): Promise<LoadResult<PermissionPolicyEntity>[]> {
    const dbRules = await (txCtx.tx || this.prismaSrv).casbinRule.findMany({
      skip: params.page.offset,
      take: params.page.limit,
      where: this.#getPolicyWhere(params),
    });

    return dbRules.map(makeCasbinRuleEntity);
  }

  async createPolicy(
    _txCtx: TxRequestContext,
    _data: CreatePolicyData,
  ): Promise<PermissionPolicyEntity> {
    throw new Error('To be implemented');
  }

  #getPolicyWhere(_params: FindManyPoliciesParams): Prisma.CasbinRuleWhereInput {
    return { ptype: 'p' };
  }
}
