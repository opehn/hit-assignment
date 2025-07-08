import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryRunner, Repository } from 'typeorm';
import { Menu } from '../common/entity/menu.entity';
import { Owner } from '../common/entity/owner.entity';
import { ReservationMenu } from '../common/entity/reservation-menu.entity';
import { Reservation } from '../common/entity/reservation.entity';
import { Store } from '../common/entity/store.entity';
import { IReservationSearchData } from './dto/forms';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly repository: Repository<Reservation>,
  ) {}

  async save(data: Partial<Reservation>, qr?: QueryRunner) {
    const source = qr ? qr.manager.getRepository(Reservation) : this.repository;

    return await source.save(data);
  }

  async update(id: number, data: Partial<Reservation>, qr?: QueryRunner) {
    const source = qr ? qr.manager.getRepository(Reservation) : this.repository;

    return await source.update(id, data);
  }

  async softDelete(id: number, user: Partial<Owner>, qr?: QueryRunner) {
    const source = qr ? qr.manager.getRepository(Reservation) : this.repository;

    return await source.update(id, { isDeleted: true, deletedById: user.id });
  }

  private getMenusCte(manager: EntityManager, menuId?: number) {
    const queryBuilder = manager
      .getRepository(ReservationMenu)
      .createQueryBuilder('reservationMenu')
      .select(['reservationMenu.reservationId as reservationId'])
      .addSelect(
        `
          json_object(
            'id', menu.id,
            'name', menu.name,
            'price', menu.price
          )
        `,
        'menu',
      )
      .innerJoin(Menu, 'menu', 'menu.id = reservationMenu.menuId');

    if (menuId) {
      queryBuilder.andWhere('menu.id = :menuId', { menuId });
    }

    return queryBuilder;
  }

  async getReservations(params?: IReservationSearchData, qr?: QueryRunner) {
    const { mobile, from, to, minGuest, maxGuest, menuId } = params;
    const manager = qr ? qr.manager : this.repository.manager;

    const source = qr ? qr.manager.getRepository(Reservation) : this.repository;

    const queryBuilder = source
      .createQueryBuilder('reservation')
      .addCommonTableExpression(this.getMenusCte(manager, menuId), 'menusCte')
      .select([
        'reservation.id as id',
        'reservation.createdDateTime as createdDateTime',
        'reservation.mobile as mobile',
        'reservation.date as date',
        'reservation.startTime as startTime',
        'reservation.endTime as endTime',
        'reservation.guestCount as guestCount',
        'reservation.isDeleted as isDeleted',
      ])
      .addSelect(
        `
          json_object (
            'id', store.id, 
            'name', store.name
          )
        `,
        'store',
      )
      .addSelect(
        `
          json_arrayagg(
            CASE 
              WHEN menusCte.menu IS NOT NULL 
              THEN menusCte.menu 
            END
          )
        `,
        'menus',
      )
      .leftJoin(Store, 'store', 'store.id = reservation.storeId')
      .leftJoin(
        'menusCte',
        'menusCte',
        'menusCte.reservationId = reservation.id AND menusCte.menu IS NOT NULL',
      )
      .groupBy('reservation.id');

    if (mobile) {
      queryBuilder.andWhere(`reservation.mobile LIKE :mobile`, {
        mobile: `%${mobile}%`,
      });
    }

    if (menuId) {
      queryBuilder.andWhere('menusCte.reservationId IS NOT NULL');
    }

    if (from) {
      queryBuilder.andWhere(`reservation.date >= :from`, { from });
    }

    if (to) {
      queryBuilder.andWhere(`reservation.date <= :to`, { to });
    }

    if (minGuest) {
      queryBuilder.andWhere(`reservation.guestCount >= :minGuest`, {
        minGuest,
      });
    }

    if (maxGuest) {
      queryBuilder.andWhere(`reservation.guestCount <= :maxGuest`, {
        maxGuest,
      });
    }

    return queryBuilder.getRawMany();
  }

  async checkTimeConflict(
    storeId: number,
    date: string,
    startTime: string,
    endTime: string,
    qr?: QueryRunner,
  ): Promise<boolean> {
    const source = qr ? qr.manager.getRepository(Reservation) : this.repository;

    const conflictingReservation = await source
      .createQueryBuilder('reservation')
      .where('reservation.storeId = :storeId', { storeId })
      .andWhere('reservation.date = :date', { date })
      .andWhere('reservation.isDeleted = false')
      .andWhere(
        `(
          (reservation.startTime < :endTime AND reservation.endTime > :startTime)
        )`,
        { startTime, endTime },
      )
      .setLock('pessimistic_write')
      .getRawOne();

    return !!conflictingReservation;
  }
}
