import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { MenuCategoryRepository } from './menu-category.repository';
import { MenuCategory } from '../common/entity/menu-category.entity';

@Injectable()
export class MenuCategoryService {
  constructor(private readonly repository: MenuCategoryRepository) {}

  async save(data: Partial<MenuCategory>[], qr?: QueryRunner) {
    return await this.repository.save(data, qr);
  }
}
