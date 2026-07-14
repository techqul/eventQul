import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T = any> {
  @ApiProperty()
  success!: boolean;

  @ApiProperty()
  message!: string;

  @ApiProperty({ required: false })
  data?: T;

  @ApiProperty({ required: false })
  errors?: any[];

  @ApiProperty({ required: false })
  statusCode?: number;
}

export class PaginationResponseDto<T = any> {
  @ApiProperty()
  success!: boolean;

  @ApiProperty()
  message!: string;

  @ApiProperty()
  data!: T[];

  @ApiProperty()
  pagination!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
