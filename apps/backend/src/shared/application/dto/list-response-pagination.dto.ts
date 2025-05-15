import { ApiProperty } from '@nestjs/swagger';

import type { ResponsePagination } from '@repo/api-models';

export class ListResponsePaginationDto implements ResponsePagination {
  @ApiProperty({ description: 'Number of items in response' })
  skipped: number[];

  @ApiProperty({ description: 'Number of requested items' })
  limit: number;

  @ApiProperty({ description: 'Number of skipped items' })
  offset: number;

  @ApiProperty({ description: 'Total number of items' })
  total: number;

  static from(data: ResponsePagination): ListResponsePaginationDto {
    return new ListResponsePaginationDto(data.skipped, data.limit, data.offset, data.total);
  }

  constructor(skipped: number[], limit: number, offset: number, total: number) {
    this.skipped = skipped;
    this.limit = limit;
    this.offset = offset;
    this.total = total;
  }
}
