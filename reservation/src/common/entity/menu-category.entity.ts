import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.entity';

export const MENU_CATEGORY = {
  KOR: '한식',
  JAP: '일식',
  CHI: '중식',
} as const;

export type MenuCategoryType =
  (typeof MENU_CATEGORY)[keyof typeof MENU_CATEGORY];

@Entity({
  synchronize: true,
  name: 'menu_categories',
  comment: '메뉴 카테고리',
})
export class MenuCategory extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '메뉴 카테고리 이름',
  })
  name: MenuCategoryType;
}
