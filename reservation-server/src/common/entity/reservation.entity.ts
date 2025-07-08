import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from './base.entity';
import { Customer } from './customer.entity';
import { Store } from './store.entity';

@Entity({
  synchronize: true,
  name: 'reservations',
  comment: '예약 정보',
})
export class Reservation extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'uuid',
    nullable: false,
    comment: '고객 ID',
  })
  customerId: string;

  @Column({
    type: 'int',
    nullable: false,
    comment: '식당 ID',
  })
  storeId: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '인원수',
  })
  guestCount: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: '예약자 번호',
  })
  mobile: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: '예약 날짜 (YYYY-MM-DD)',
  })
  date: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: '예약 시작 시간 (HH:MM)',
  })
  startTime: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: '예약 종료 시간 (HH:MM)',
  })
  endTime: string;

  @ManyToOne(() => Customer, {
    nullable: false,
  })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => Store, {
    nullable: false,
  })
  @JoinColumn({ name: 'storeId' })
  store: Store;
}
