import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { MenuCategory } from '../common/entity/menu-category.entity';

@Injectable()
export class MenuCategoryRepository {
  constructor(
    @InjectRepository(MenuCategory)
    private readonly repository: Repository<MenuCategory>,
  ) {}

  async save(data: Partial<MenuCategory>[], qr?: QueryRunner) {
    const source = qr
      ? qr.manager.getRepository(MenuCategory)
      : this.repository;

    await source.save(data);
  }
}
