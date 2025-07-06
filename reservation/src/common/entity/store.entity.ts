import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from './base.entity';
import { Owner } from './owner.entity';

@Entity({
  synchronize: true,
  name: 'stores',
  comment: '식당 정보',
})
@Index(['ownerId', 'name'], {
  unique: true,
  where: '"isDeleted" = false',
})
export class Store extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'uuid',
    nullable: false,
    comment: '식당 주인 ID',
  })
  ownerId: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '식당 이름',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '주소',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: '운영 시작 시간 (HH:MM)',
  })
  startTime: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: '운영 마감 시간 (HH:MM)',
  })
  endTime: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: '전화번호',
  })
  mobile: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '식당 설명',
  })
  description?: string;

  @ManyToOne(() => Owner, (owner) => owner.stores)
  @JoinColumn({ name: 'ownerId' })
  owner: Owner;
}
