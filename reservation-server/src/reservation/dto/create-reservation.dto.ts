import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsPositive } from 'class-validator';
import { IsHHmmss } from '../../common/validator/is-hhmmss.validator';
import { IsKoreanMobileFormat } from '../../common/validator/is-korean-mobile.validator';
import { IsYYYYMMDD } from '../../common/validator/is-yyyymmdd.validator';
import { IReservationCreateData } from './forms';

export class ReservationCreateDto implements IReservationCreateData {
  @ApiProperty({
    description: '상점 ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsPositive()
  storeId: number;

  @ApiProperty({
    description: '예약일(YYYY-MM-DD)',
    example: '2025-07-12',
  })
  @IsNotEmpty()
  @IsYYYYMMDD()
  date: string;

  @ApiProperty({
    description: '예약 시작 시간(HH:mm:ss)',
    example: '18:00:00',
  })
  @IsNotEmpty()
  @IsHHmmss()
  startTime: string;

  @ApiProperty({
    description: '예약 종료 시간(HH:mm:ss)',
    example: '20:00:00',
  })
  @IsNotEmpty()
  @IsHHmmss()
  endTime: string;

  @ApiProperty({
    description: '예약자 번호',
    example: '010-0000-0000',
  })
  @IsNotEmpty()
  @IsKoreanMobileFormat()
  mobile: string;

  @ApiProperty({
    description: '인원수',
    example: 4,
  })
  @IsNotEmpty()
  @IsPositive()
  guestCount: number;

  @ApiProperty({
    description: '메뉴 ID 목록',
    example: [1, 2],
  })
  @IsNotEmpty()
  @IsArray()
  @IsPositive({ each: true })
  menuIds: number[];
}
