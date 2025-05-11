import { GetManyPermissionPoliciesQuery } from '@repo/api-models';
import { ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { CASBIN_SRV } from 'src/modules/casbin';
import { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { PermissionPolicyEntity } from 'src/modules/casbin/domain/entities/permission-policy.entity';
import { RequestContext } from 'src/shared/utils/request-context';
import { LoadResult, SkippedReason } from 'src/shared/utils/load-result';

import { PERMISSION_POLICY_ACCESS_CONTROL_SRV } from '../../domain/interfaces/permission-policies-access.service.interface';
import { PermissionPolicyDto } from '../../domain/dto/permission-policy.dto';
import { PermissionPolicyListResponseDto } from '../../domain/dto/permission-policy-list-response.dto';

@Injectable()
export class GetPermissionPoliciesListUseCase {
  constructor(
    @Inject(CASBIN_SRV)
    private readonly casbinSrv: IdentifierOf<typeof CASBIN_SRV>,

    @Inject(PERMISSION_POLICY_ACCESS_CONTROL_SRV)
    private readonly policyAControlSrv: IdentifierOf<typeof PERMISSION_POLICY_ACCESS_CONTROL_SRV>,
  ) {}

  async execute(
    reqCtx: RequestContext,
    query: GetManyPermissionPoliciesQuery,
  ): Promise<PermissionPolicyListResponseDto> {
    if (!reqCtx.isAuthorized()) throw new UnauthorizedException();
    if (!this.policyAControlSrv.checkCanViewPermissionPololicy(reqCtx)) {
      throw new ForbiddenException();
    }

    const { items, total } = await this.casbinSrv.getManyPoliciesWithTotal(reqCtx, query);

    const accessCheckedItems = await Promise.all(
      items.map(loaded =>
        loaded.type === 'ok'
          ? this.policyAControlSrv
              .filterCanReadPermissionPololicy(reqCtx, loaded.data)
              .then(
                (data): LoadResult<PermissionPolicyEntity> =>
                  data
                    ? { data, type: 'ok' }
                    : { reason: SkippedReason.ACCESS_DENIED, type: 'skipped' },
              )
          : loaded,
      ),
    );

    return PermissionPolicyListResponseDto.from({
      items: accessCheckedItems
        .filter(i => i.type === 'ok')
        .map(i => i.data)
        .map(i => PermissionPolicyDto.fromEntity(i)),

      pagination: {
        count: items.filter(i => i.type === 'ok').length,
        limit: query.page.limit,
        offset: query.page.offset,
        total: total,
      },
    });
  }
}
