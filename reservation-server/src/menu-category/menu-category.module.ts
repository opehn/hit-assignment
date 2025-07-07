import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuCategoryRepository } from './menu-category.repository';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategory } from '../common/entity/menu-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuCategory])],
  providers: [MenuCategoryService, MenuCategoryRepository],
  exports: [MenuCategoryService],
})
export class MenuCategoryModule {}
