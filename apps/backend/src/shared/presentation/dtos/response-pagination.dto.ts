import { ApiProperty } from '@nestjs/swagger';

export class ResponsePaginationDTO {
  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  constructor(data: ResponsePaginationDTO) {
    this.total = data.total;
    this.limit = data.limit;
    this.offset = data.offset;
  }
}
