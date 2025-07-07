import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PublicRoute } from '../common/decorator/route.decorator';
import { CustomerSignInDto, OwnerSignInDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('customer/signin')
  @HttpCode(HttpStatus.OK)
  @PublicRoute()
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '로그인 성공',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: '인증 실패' })
  async customerSignIn(@Body() body: CustomerSignInDto) {
    return await this.authService.customerSignIn(body);
  }

  @Post('owner/signin')
  @HttpCode(HttpStatus.OK)
  @PublicRoute()
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '로그인 성공',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: '인증 실패' })
  async ownerSignIn(@Body() body: OwnerSignInDto) {
    return await this.authService.ownerSignIn(body);
  }
}
