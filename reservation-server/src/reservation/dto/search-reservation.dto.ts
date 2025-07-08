import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { IsYYYYMMDD } from '../../common/validator/is-yyyymmdd.validator';
import { IReservationSearchData } from './forms';

export class ReservationSearchDto implements IReservationSearchData {
  @ApiPropertyOptional({
    description: '예약자 번호',
    example: '010-0000-0000',
    required: false,
  })
  @IsOptional()
  mobile?: string;

  @ApiPropertyOptional({
    description: '예약 검색 시작일',
    example: '2025-07-01',
    required: false,
  })
  @IsOptional()
  @IsYYYYMMDD()
  from?: string;

  @ApiPropertyOptional({
    description: '예약 검색 말일',
    example: '2025-07-31',
    required: false,
  })
  @IsOptional()
  @IsYYYYMMDD()
  to?: string;

  @ApiPropertyOptional({
    description: '최소 인원수',
    example: 3,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minGuest?: number;

  @ApiPropertyOptional({
    description: '최대 인원수',
    example: 3,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxGuest?: number;

  @ApiPropertyOptional({
    description: '포함 메뉴 id',
    example: 3,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  menuId?: number;
}
