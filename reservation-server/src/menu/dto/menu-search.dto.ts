import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { IMenuSearchData } from './forms';

export class MenuSearchDto implements IMenuSearchData {
  @ApiPropertyOptional({
    description: '메뉴 이름',
    example: '치킨',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: '최소 가격',
    example: 5000,
    required: false,
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  minPrice?: number;

  @ApiPropertyOptional({
    description: '최대 가격',
    example: 15000,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  maxPrice?: number;
}
