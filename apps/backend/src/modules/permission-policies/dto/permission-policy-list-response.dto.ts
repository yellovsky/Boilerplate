import { ApiProperty } from '@nestjs/swagger';

import type { GetManyPermissionPoliciesResponse, ResponsePagination } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import { SuccessResponseDto } from 'src/shared/dto/success-response.dto';
import type { JSONLike } from 'src/shared/utils/json-like';

import type { PermissionPolicyEntity } from 'src/modules/casbin';

import { PermissionPolicyDto } from './permission-policy.dto';

interface PermissionPolicyListResponseDataDtoData {
  items: Array<PermissionPolicyDto | PermissionPolicyEntity>;
  pagination: ResponsePagination | ListResponsePaginationDto;
}

class PermissionPolicyListResponseDataDto {
  @ApiProperty({
    description: 'Permission policies',
    type: [PermissionPolicyDto],
  })
  items: PermissionPolicyDto[];

  @ApiProperty({
    description: 'List response items pagination',
    type: ListResponsePaginationDto,
  })
  pagination: ListResponsePaginationDto;

  static from(data: PermissionPolicyListResponseDataDtoData): PermissionPolicyListResponseDataDto {
    return new PermissionPolicyListResponseDataDto(data.items, data.pagination);
  }

  constructor(
    items: Array<PermissionPolicyDto | PermissionPolicyEntity>,
    pagination: ResponsePagination | ListResponsePaginationDto
  ) {
    this.items = items.map((i) => (i instanceof PermissionPolicyDto ? i : PermissionPolicyDto.fromEntity(i)));

    this.pagination =
      pagination instanceof ListResponsePaginationDto ? pagination : ListResponsePaginationDto.from(pagination);
  }
}

export class PermissionPolicyListResponseDto
  extends SuccessResponseDto
  implements JSONLike<GetManyPermissionPoliciesResponse>
{
  @ApiProperty({
    description: 'Response data',
    type: PermissionPolicyListResponseDataDto,
  })
  data: PermissionPolicyListResponseDataDto;

  static from(data: PermissionPolicyListResponseDataDtoData): PermissionPolicyListResponseDto {
    return new PermissionPolicyListResponseDto(data.items, data.pagination);
  }

  constructor(
    items: Array<PermissionPolicyDto | PermissionPolicyEntity>,
    pagination: ResponsePagination | ListResponsePaginationDto
  ) {
    super();

    this.data = PermissionPolicyListResponseDataDto.from({ items, pagination });
  }
}
