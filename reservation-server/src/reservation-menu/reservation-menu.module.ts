import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationMenu } from '../common/entity/reservation-menu.entity';
import { MenuModule } from '../menu/menu.module';
import { ReservationMenuRepository } from './reservation-menu.repository';
import { ReservationMenuService } from './reservation-menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationMenu]), MenuModule],
  providers: [ReservationMenuService, ReservationMenuRepository],
  exports: [ReservationMenuService],
})
export class ReservationMenuModule {}
