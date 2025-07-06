import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {
  InternalServerErrorBaseException,
  NotFoundBaseException,
  UnauthorizedBaseException,
} from '../common/base.exception';
import {
  AUTHENTICATION_OPERATION_ERROR_CODE,
  NO_DATA_FOUND_CODE,
  SERVER_INTERNAL_ERROR_CODE,
} from '../common/error-codes';
import { CustomerService } from '../customer/customer.service';
import { OwnerService } from '../owner/owner.service';
import { ISignInData } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: CustomerService,
    private readonly ownerService: OwnerService,
    private readonly jwtService: JwtService,
  ) {}

  async customerSignIn(body: ISignInData) {
    try {
      const { email, password } = body;

      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new NotFoundBaseException(
          NO_DATA_FOUND_CODE,
          `${email}로 가입된 사용자가 없습니다.`,
        );
      }

      if (!user.isActive) {
        throw new UnauthorizedBaseException(
          AUTHENTICATION_OPERATION_ERROR_CODE,
          '휴면 계정입니다.',
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedBaseException(
          AUTHENTICATION_OPERATION_ERROR_CODE,
          '이메일 또는 비밀번호가 올바르지 않습니다.',
        );
      }

      const payload = {
        sub: user.id,
        email: user.email,
        name: user.name,
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedBaseException ||
        error instanceof NotFoundBaseException
      ) {
        throw error;
      }

      throw new InternalServerErrorBaseException(
        SERVER_INTERNAL_ERROR_CODE,
        error.message,
      );
    }
  }

  async ownerSignIn(body: ISignInData) {
    try {
      const { email, password } = body;

      const owner = await this.ownerService.findByEmail(email);
      if (!owner) {
        throw new NotFoundBaseException(
          NO_DATA_FOUND_CODE,
          `${email}로 가입된 사용자가 없습니다.`,
        );
      }

      if (!owner.isActive) {
        throw new UnauthorizedBaseException(
          AUTHENTICATION_OPERATION_ERROR_CODE,
          '휴면 계정입니다.',
        );
      }

      const isPasswordValid = await bcrypt.compare(password, owner.password);
      if (!isPasswordValid) {
        throw new UnauthorizedBaseException(
          AUTHENTICATION_OPERATION_ERROR_CODE,
          '이메일 또는 비밀번호가 올바르지 않습니다.',
        );
      }

      const payload = {
        sub: owner.id,
        email: owner.email,
        name: owner.name,
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        accessToken,
        user: {
          id: owner.id,
          email: owner.email,
          name: owner.name,
        },
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedBaseException ||
        error instanceof NotFoundBaseException
      ) {
        throw error;
      }

      throw new InternalServerErrorBaseException(
        SERVER_INTERNAL_ERROR_CODE,
        error.message,
      );
    }
  }
}
