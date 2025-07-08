import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { IMenuCreateData } from './forms';

export class MenuCreateDto implements IMenuCreateData {
  @ApiProperty({
    description: '상점 ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsPositive()
  storeId: number;

  @ApiProperty({
    description: '메뉴 카테고리 ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsPositive()
  menuCategoryId: number;

  @ApiProperty({
    description: '메뉴 이름',
    example: '양념 치킨',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: '메뉴 가격',
    example: 18000,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: '메뉴 설명',
    example: '맛있는 양념치킨',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
