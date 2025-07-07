import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseModel } from './base.entity';
import { Menu } from './menu.entity';
import { Reservation } from './reservation.entity';

@Entity({
  synchronize: true,
  name: 'reservation_menus',
  comment: '예약 메뉴 정보',
})
export class ReservationMenu extends BaseModel {
  @PrimaryColumn({
    type: 'int',
    comment: '예약 ID',
  })
  reservationId: number;

  @PrimaryColumn({
    type: 'int',
    nullable: false,
    comment: '메뉴 ID',
  })
  menuId: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '예약 당시 메뉴 이름',
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
    comment: '예약 당시 메뉴 가격',
  })
  price: number;

  @ManyToOne(() => Reservation, {
    nullable: false,
  })
  @JoinColumn({ name: 'reservationId' })
  reservation: Reservation;

  @ManyToOne(() => Menu, {
    nullable: false,
  })
  @JoinColumn({ name: 'menuId' })
  menu: Menu;
}
