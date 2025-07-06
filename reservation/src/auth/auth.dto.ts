import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ISignInData } from './auth.type';

export class CustomerSignInDto implements ISignInData {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: '이메일 주소',
    example: 'acho@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '비밀번호',
    example: 'password',
  })
  password: string;
}

export class OwnerSignInDto implements ISignInData {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: '이메일 주소',
    example: 'sajang@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '비밀번호',
    example: 'password',
  })
  password: string;
}
