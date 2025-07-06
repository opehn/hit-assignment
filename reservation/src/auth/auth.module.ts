import { Module } from '@nestjs/common';
import { CustomerModule } from '../customer/customer.module';
import { OwnerModule } from '../owner/owner.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [CustomerModule, OwnerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
