import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../../customer/customer.service';
import { OwnerService } from '../../owner/owner.service';
import { ROLE_KEY } from '../decorator/role.decorator';
import { PUBLIC_ROUTE_KEY } from '../decorator/route.decorator';
import { UserRoles } from '../enum/user.enum';
import { BaseException } from '../exception/base.exception';
import { AUTHENTICATION_ERROR_CODE } from '../exception/error-codes';

@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: CustomerService,
    private readonly ownerService: OwnerService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.url.startsWith('/api-docs')) {
      return true;
    }

    const isPublic = this.reflector.getAllAndOverride(PUBLIC_ROUTE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      req.isPublicRoute = true;
      return true;
    }

    const userRole = this.reflector.getAllAndOverride(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log(req.headers);
    const rawToken = req.headers['authorization'];
    if (!rawToken) {
      throw new BaseException(
        AUTHENTICATION_ERROR_CODE,
        'Authorization header가 없습니다',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.extractTokenFromHeader(rawToken);

    try {
      const payload = this.jwtService.verify(token);

      let user;
      if (userRole.includes(UserRoles.CUSTOMER)) {
        user = await this.userService.findByEmail(payload.email);
      }
      if (userRole.includes(UserRoles.OWNER)) {
        user = await this.ownerService.findByEmail(payload.email);
      }

      if (!user || !user.isActive) {
        throw new BaseException(
          AUTHENTICATION_ERROR_CODE,
          '존재하지 않거나 비활성 유저입니다',
          HttpStatus.UNAUTHORIZED,
        );
      }

      req.user = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
      };
      req.token = token;

      return true;
    } catch (error) {
      if (error instanceof BaseException) {
        throw error;
      }

      throw new BaseException(
        AUTHENTICATION_ERROR_CODE,
        '유효하지 않은 토큰입니다',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private extractTokenFromHeader(authorization: string): string {
    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new BaseException(
        AUTHENTICATION_ERROR_CODE,
        'authorization header의 형식이 잘못되었습니다',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return token;
  }
}
