import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';
import { IReservationUpdateData } from './forms';

export class ReservationUpdateDto implements IReservationUpdateData {
  @ApiPropertyOptional({
    description: '인원수',
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  guestCount?: number;

  @ApiPropertyOptional({
    description: '메뉴 ID 목록',
    example: [3],
    required: false,
  })
  @IsOptional()
  @IsPositive({ each: true })
  menuIds?: number[];
}
