import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { Customer } from '../common/entity/customer.entity';
import { Owner } from '../common/entity/owner.entity';
import {
  BadRequestBaseException,
  NotFoundBaseException,
} from '../common/exception/base.exception';
import {
  BAD_REQUEST_ERROR_CODE,
  NO_DATA_FOUND_CODE,
} from '../common/exception/error-codes';
import { TransactionService } from '../common/provider/trasaction.service';
import { MenuService } from '../menu/menu.service';
import { ReservationMenuService } from '../reservation-menu/reservation-menu.service';
import { StoreService } from '../store/store.service';
import { IReservationCreateData, IReservationUpdateData } from './dto/forms';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    private readonly repository: ReservationRepository,
    private readonly storeService: StoreService,
    private readonly reservationMenuService: ReservationMenuService,
    private readonly menuService: MenuService,
    private readonly dataSource: DataSource,
    private readonly transactionService: TransactionService,
  ) {}

  async create(
    data: IReservationCreateData,
    user: Partial<Owner | Customer>,
    qr?: QueryRunner,
  ) {
    const { storeId, menuIds, ...reservationData } = data;

    const store = await this.storeService.findOne(storeId);
    if (!store || store.isDeleted) {
      throw new NotFoundBaseException(
        NO_DATA_FOUND_CODE,
        `id: ${storeId} 가게가 존재하지 않습니다`,
      );
    }

    if (
      store.startTime > reservationData.startTime ||
      store.endTime < reservationData.endTime
    ) {
      throw new BadRequestBaseException(
        BAD_REQUEST_ERROR_CODE,
        `예약 시간이 가게의 운영시간(${store.startTime}~${store.endTime}) 범위를 벗어납니다`,
      );
    }

    const menus = await this.menuService.findByIds(menuIds, true);

    if (menus.length !== menuIds.length) {
      throw new BadRequestBaseException(
        BAD_REQUEST_ERROR_CODE,
        '존재하지 않는 메뉴입니다',
      );
    }

    await this.transactionService.executeTransaction(async (queryRunner) => {
      const reservation = await this.repository.save(
        {
          customerId: user.id,
          createdById: user.id,
          storeId,
          ...reservationData,
        },
        queryRunner,
      );

      const reservationMenus = menus.map((menu) => ({
        menuId: menu.id,
        reservationId: reservation.id,
        name: menu.name,
        price: menu.price,
      }));

      await this.reservationMenuService.save(reservationMenus, queryRunner);
      return reservation;
    }, qr);
  }

  async update(
    id: number,
    data: IReservationUpdateData,
    user: Partial<Customer>,
    qr?: QueryRunner,
  ) {
    const { guestCount, menuIds } = data;
    return await this.transactionService.executeTransaction(
      async (queryRunner) => {
        if (guestCount) {
          await this.repository.update(
            id,
            { guestCount, updatedById: user.id },
            queryRunner,
          );
        }

        if (menuIds) {
          await this.reservationMenuService.replace(
            id,
            menuIds,
            user,
            queryRunner,
          );
        }
      },
      qr,
    );
  }

  async softDelete(id: number, user: Partial<Customer>, qr?: QueryRunner) {
    return await this.transactionService.executeTransaction(
      async (queryRunner) => {
        await this.repository.softDelete(id, user, queryRunner);
        await this.reservationMenuService.softDeleteByReservationId(
          id,
          user,
          queryRunner,
        );
      },
      qr,
    );
  }
}
