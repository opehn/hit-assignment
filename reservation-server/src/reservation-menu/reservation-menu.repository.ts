import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';
import { Customer } from '../common/entity/customer.entity';
import { ReservationMenu } from '../common/entity/reservation-menu.entity';

@Injectable()
export class ReservationMenuRepository {
  constructor(
    @InjectRepository(ReservationMenu)
    private readonly repository: Repository<ReservationMenu>,
  ) {}

  async save(data: Partial<ReservationMenu>[], qr?: QueryRunner) {
    const source = qr
      ? qr.manager.getRepository(ReservationMenu)
      : this.repository;

    await source.save(data, qr);
  }

  async softDelete(
    reservationId: number,
    menuIds: number[],
    user: Partial<Customer>,
    qr?: QueryRunner,
  ) {
    const source = qr
      ? qr.manager.getRepository(ReservationMenu)
      : this.repository;

    return await source.update(
      {
        reservationId,
        menuId: In(menuIds),
      },
      {
        isDeleted: true,
        deletedById: user.id,
      },
    );
  }

  async softDeleteByReservationId(
    reservationId: number,
    user: Partial<Customer>,
    qr?: QueryRunner,
  ) {
    const source = qr
      ? qr.manager.getRepository(ReservationMenu)
      : this.repository;

    return await source.update(
      { reservationId },
      {
        isDeleted: true,
        deletedById: user.id,
      },
    );
  }

  async findByReservationId(reservationId: number, qr?: QueryRunner) {
    const source = qr
      ? qr.manager.getRepository(ReservationMenu)
      : this.repository;

    return source.find({ where: { reservationId } });
  }
}
