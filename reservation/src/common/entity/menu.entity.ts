import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.entity';

@Entity({
  synchronize: true,
  name: 'menus',
  comment: '식당 메뉴',
})
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
}
