import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '../common/entity/store.entity';
import { StoreRepository } from './store.repository';
import { StoreService } from './store.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [StoreService, StoreRepository],
  exports: [StoreService],
})
export class StoreModule {}
