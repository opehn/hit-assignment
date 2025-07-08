import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../common/entity/reservation.entity';
import { MenuModule } from '../menu/menu.module';
import { ReservationMenuModule } from '../reservation-menu/reservation-menu.module';
import { StoreModule } from '../store/store.module';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    StoreModule,
    ReservationMenuModule,
    MenuModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
  exports: [ReservationService],
})
export class ReservationModule {}
