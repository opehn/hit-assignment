import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { IMenuData } from './forms';

export class MenuCreateDto implements IMenuData {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: '상점 ID',
    example: 1,
  })
  storeId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: '메뉴 카테고리 ID',
    example: 1,
  })
  menuCategoryId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '메뉴 이름',
    example: '양념 치킨',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '메뉴 가격',
    example: 18000,
  })
  price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '메뉴 설명',
    example: '맛있는 양념치킨',
  })
  description: string;
}
