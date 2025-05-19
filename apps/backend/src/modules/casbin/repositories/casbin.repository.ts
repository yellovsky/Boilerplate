import type { CasbinRule, Prisma } from '@generated/prisma';
import { Inject, Injectable } from '@nestjs/common';
import Either from 'effect/Either';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { type SkippedOr, SkippedReason } from 'src/shared/utils/load-result';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import { PermissionPolicyEntity } from '../entities/permission-policy.entity';
import type {
  CasbinRepository,
  CreatePolicyData,
  FindManyPoliciesParams,
} from '../interfaces/casbin.repository.interace';
import { isCasbinAction } from '../interfaces/casbin-rule.interfaces';

const makeCasbinRuleEntity = (rule: CasbinRule): SkippedOr<PermissionPolicyEntity> => {
  if (rule.ptype !== 'p') {
    return Either.left({
      message: 'ptype must equals p',
      reason: SkippedReason.WRONG_INPUT,
    });
  }

  if (!isCasbinAction(rule.v1)) {
    return Either.left({
      message: 'rule.v1 is not a CasbinAction',
      reason: SkippedReason.INVALID_DATA,
    });
  }

  if (!rule.v0 || !rule.v2) {
    return Either.left({
      message: 'rule.v0, rule.v2 and rule.v3 must be not empty',
      reason: SkippedReason.INSUFFICIENT_DATA,
    });
  }

  return Either.right(
    PermissionPolicyEntity.from({
      action: rule.v1,
      condition: rule.v3,
      createdAt: rule.createdAt,
      id: rule.id,
      note: rule.note,
      objectType: rule.v2,
      subject: rule.v0,
      updatedAt: rule.updatedAt,
    })
  );
};

@Injectable()
export class CasbinRepositoryImpl implements CasbinRepository {
  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  async getTotal(txCtx: TxRequestContext, params: FindManyPoliciesParams): Promise<number> {
    return (txCtx.tx || this.prismaSrv).casbinRule.count({
      where: this.#getPolicyWhere(params),
    });
  }

  async findManyPolicies(
    txCtx: TxRequestContext,
    params: FindManyPoliciesParams
  ): Promise<SkippedOr<PermissionPolicyEntity>[]> {
    const dbRules = await (txCtx.tx || this.prismaSrv).casbinRule.findMany({
      skip: params.page.offset,
      take: params.page.limit,
      where: this.#getPolicyWhere(params),
    });

    return dbRules.map(makeCasbinRuleEntity);
  }

  async createPolicy(_txCtx: TxRequestContext, _data: CreatePolicyData): Promise<PermissionPolicyEntity> {
    throw new Error('To be implemented');
  }

  #getPolicyWhere(_params: FindManyPoliciesParams): Prisma.CasbinRuleWhereInput {
    return { ptype: 'p' };
  }
}
