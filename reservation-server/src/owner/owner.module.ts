import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from '../common/entity/owner.entity';
import { OwnerRepository } from './owner.repository';
import { OwnerService } from './owner.service';

@Module({
  imports: [TypeOrmModule.forFeature([Owner])],
  providers: [OwnerService, OwnerRepository],
  exports: [OwnerService],
})
export class OwnerModule {}
