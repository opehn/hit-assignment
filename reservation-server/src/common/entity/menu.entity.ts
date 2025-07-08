import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from './base.entity';
import { MenuCategory } from './menu-category.entity';
import { Store } from './store.entity';

@Entity({
  synchronize: true,
  name: 'menus',
  comment: '식당 메뉴',
})
@Index('idx_menu_search', ['isDeleted', 'name', 'price'])
export class Menu extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '메뉴 카테고리 ID',
  })
  menuCategoryId: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '식당 ID',
  })
  storeId: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '메뉴 이름',
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
    comment: '가격',
  })
  price: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: '메뉴 설명',
  })
  description: string;

  @ManyToOne(() => MenuCategory, {
    nullable: false,
  })
  @JoinColumn({ name: 'menuCategoryId' })
  menuCategory: MenuCategory;

  @ManyToOne(() => Store, {
    nullable: false,
  })
  @JoinColumn({ name: 'storeId' })
  store: Store;
}
