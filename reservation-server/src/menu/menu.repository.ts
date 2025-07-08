import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';
import { MenuCategory } from '../common/entity/menu-category.entity';
import { Menu } from '../common/entity/menu.entity';
import { Owner } from '../common/entity/owner.entity';
import { Store } from '../common/entity/store.entity';
import { IMenuSearchData } from './dto/forms';

@Injectable()
export class MenuRepository {
  constructor(
    @InjectRepository(Menu)
    private readonly repository: Repository<Menu>,
  ) {}

  async save(data: Partial<Menu>, qr?: QueryRunner) {
    const source = qr ? qr.manager.getRepository(Menu) : this.repository;

    return await source.save(data);
  }

  async softDelete(id: number, user: Partial<Owner>, qr?: QueryRunner) {
    const source = qr ? qr.manager.getRepository(Menu) : this.repository;

    return await source.update(id, { isDeleted: true, deletedById: user.id });
  }

  async getMenus(params: IMenuSearchData, qr?: QueryRunner) {
    const source = qr ? qr.manager.getRepository(Menu) : this.repository;

    const { name, minPrice, maxPrice } = params;

    const qb = source
      .createQueryBuilder('menu')
      .select([
        'menu.id as id',
        'menu.name as name',
        'menu.price as price',
        'menu.description as description',
      ])
      .addSelect(
        `
        json_object (
            'id', store.id,
            'name', store.name
        )`,
        'store',
      )
      .addSelect(
        `
        json_object (
            'id', category.id,
            'name', category.name
        )`,
        'category',
      )
      .where('menu.isDeleted = false');

    if (name) {
      qb.andWhere(`menu.name LIKE :name`, { name: `%${name}%` });
    }

    if (minPrice) {
      qb.andWhere(`menu.price >= :minPrice`, { minPrice });
    }

    if (maxPrice) {
      qb.andWhere(`menu.price <= :maxPrice`, { maxPrice });
    }

    qb.innerJoin(Store, 'store', 'store.id = menu.storeId').innerJoin(
      MenuCategory,
      'category',
      'category.id = menu.menuCategoryId',
    );

    return qb.getRawMany();
  }

  async findByIds(ids: number[], qr?: QueryRunner) {
    const source = qr ? qr.manager.getRepository(Menu) : this.repository;

    return await source.find({
      where: { id: In(ids) },
    });
  }
}
