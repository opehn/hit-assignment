import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Customer as UserModel } from '../entity/customer.entity';

export const User = createParamDecorator(
  (data: keyof UserModel | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    const user = req.user as UserModel;

    if (!user) {
      throw new InternalServerErrorException('User 정보가 존재하지 않습니다.');
    }

    if (data) {
      return user[data];
    }

    return user;
  },
);
