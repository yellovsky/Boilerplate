import { ApiProperty } from '@nestjs/swagger';
import { ResponsePagination } from '@repo/api-models';

export class ListResponsePaginationDto implements ResponsePagination {
  @ApiProperty({ description: 'Number of items in response' })
  count: number;

  @ApiProperty({ description: 'Number of requested items' })
  limit: number;

  @ApiProperty({ description: 'Number of skipped items' })
  offset: number;

  @ApiProperty({ description: 'Total number of items' })
  total: number;

  static from(data: ResponsePagination): ListResponsePaginationDto {
    return new ListResponsePaginationDto(data.count, data.limit, data.offset, data.total);
  }

  constructor(count: number, limit: number, offset: number, total: number) {
    this.count = count;
    this.limit = limit;
    this.offset = offset;
    this.total = total;
  }
}
