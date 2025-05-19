import { ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as Either from 'effect/Either';

import type { GetManyPermissionPoliciesQuery } from '@repo/api-models';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { CASBIN_SRV } from 'src/modules/casbin';

import { PermissionPolicyDto } from '../dto/permission-policy.dto';
import { PermissionPolicyListResponseDto } from '../dto/permission-policy-list-response.dto';
import { PERMISSION_POLICY_ACCESS_CONTROL_SRV } from '../interfaces/permission-policies-access.service.interface';

@Injectable()
export class GetPermissionPoliciesListUseCase {
  constructor(
    @Inject(CASBIN_SRV)
    private readonly casbinSrv: IdentifierOf<typeof CASBIN_SRV>,

    @Inject(PERMISSION_POLICY_ACCESS_CONTROL_SRV)
    private readonly policyAControlSrv: IdentifierOf<typeof PERMISSION_POLICY_ACCESS_CONTROL_SRV>
  ) {}

  async execute(
    reqCtx: RequestContext,
    query: GetManyPermissionPoliciesQuery
  ): Promise<PermissionPolicyListResponseDto> {
    if (!reqCtx.isAuthorized()) throw new UnauthorizedException();
    if (!this.policyAControlSrv.checkCanViewPermissionPololicy(reqCtx)) {
      throw new ForbiddenException();
    }

    const { items, total } = await this.casbinSrv.getManyPoliciesWithTotal(reqCtx, query);

    const accessCheckedItems = await Promise.all(
      items.map((loaded) =>
        Either.isRight(loaded) ? this.policyAControlSrv.filterCanReadPermissionPololicy(reqCtx, loaded.right) : loaded
      )
    );

    return PermissionPolicyListResponseDto.from({
      items: accessCheckedItems.filter(Either.isRight).map((i) => PermissionPolicyDto.fromEntity(i.right)),

      pagination: {
        limit: query.page.limit,
        offset: query.page.offset,
        skipped: accessCheckedItems
          .map((val, index) => (Either.isLeft(val) ? index : null))
          .filter((val) => val !== null),
        total: total,
      },
    });
  }
}
