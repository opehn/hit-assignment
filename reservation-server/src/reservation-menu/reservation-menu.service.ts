import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { Customer } from '../common/entity/customer.entity';
import { ReservationMenu } from '../common/entity/reservation-menu.entity';
import { BadRequestBaseException } from '../common/exception/base.exception';
import { BAD_REQUEST_ERROR_CODE } from '../common/exception/error-codes';
import { TransactionService } from '../common/provider/trasaction.service';
import { determineToDeleteIds } from '../common/util/compare';
import { MenuService } from '../menu/menu.service';
import { ReservationMenuRepository } from './reservation-menu.repository';

@Injectable()
export class ReservationMenuService {
  constructor(
    private readonly repository: ReservationMenuRepository,
    private readonly menuService: MenuService,
    private readonly dataSource: DataSource,
    private readonly transactionService: TransactionService,
  ) {}

  async save(data: Partial<ReservationMenu>[], qr?: QueryRunner) {
    return await this.repository.save(data, qr);
  }

  async softDeleteByReservationId(
    reservationId: number,
    user: Partial<Customer>,
    qr?: QueryRunner,
  ) {
    return await this.repository.softDeleteByReservationId(
      reservationId,
      user,
      qr,
    );
  }

  async getMenusByReservationId(
    reservationId: number,
    filterDeleted: boolean = false,
    qr?: QueryRunner,
  ) {
    const reservationMenus = await this.repository.findByReservationId(
      reservationId,
      qr,
    );

    if (filterDeleted) {
      return reservationMenus.filter((menu) => !menu.isDeleted);
    }

    return reservationMenus;
  }

  async replace(
    reservationId: number,
    newMenuIds: number[],
    user: Partial<Customer>,
    qr?: QueryRunner,
  ) {
    const menus = await this.menuService.findByIds(newMenuIds, true, qr);

    if (newMenuIds.length !== menus.length) {
      throw new BadRequestBaseException(
        BAD_REQUEST_ERROR_CODE,
        `존재하지 않는 메뉴입니다`,
      );
    }

    const currentMenus = await this.getMenusByReservationId(
      reservationId,
      false,
      qr,
    );

    const toDeleteMenuIds = determineToDeleteIds(
      currentMenus.map((menu) => ({ id: menu.menuId })),
      menus,
    );

    return await this.transactionService.executeTransaction(
      async (queryRunner) => {
        await this.repository.softDelete(
          reservationId,
          toDeleteMenuIds,
          user,
          queryRunner,
        );

        if (newMenuIds.length > 0) {
          const newReservationMenus = menus.map((menu) => ({
            reservationId,
            menuId: menu.id,
            name: menu.name,
            price: menu.price,
            createdById: user.id,
            isDeleted: false,
          }));

          await this.repository.save(newReservationMenus, queryRunner);
        }
      },
      qr,
    );
  }
}
