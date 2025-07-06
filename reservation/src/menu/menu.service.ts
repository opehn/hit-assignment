import { Injectable, Query } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Menu } from '../common/entity/menu.entity';
import { Owner } from '../common/entity/owner.entity';
import { IMenuSearchData } from './dto/forms';
import { MenuRepository } from './menu.repository';

@Injectable()
export class MenuService {
  constructor(private readonly repository: MenuRepository) {}

  async save(data: Partial<Menu>, user: Partial<Owner>, qr?: QueryRunner) {
    return await this.repository.save({ createdById: user.id, ...data }, qr);
  }

  async delete(id: number, user: Partial<Owner>, qr?: QueryRunner) {
    return await this.repository.delete(id, user, qr);
  }

  async getMenus(@Query() params: IMenuSearchData, qr?: QueryRunner) {
    return await this.repository.getMenus(params, qr);
  }
}
