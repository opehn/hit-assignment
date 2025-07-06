import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from './base.entity';
import { Store } from './store.entity';

@Entity({
  synchronize: true,
  name: 'owners',
  comment: '식당 주인 정보',
})
@Index(['email'], {
  unique: true,
  where: '"isDeleted" = false',
})
export class Owner extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '이메일',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '비밀번호',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '이름',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: '전화번호',
  })
  mobile: string;

  @Column({ type: 'boolean', default: true, comment: '회원 활성 여부' })
  isActive: boolean;

  @OneToMany(() => Store, (store) => store.owner)
  stores: Store[];
}
