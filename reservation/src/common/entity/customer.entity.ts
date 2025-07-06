import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.entity';

@Entity({
  synchronize: true,
  name: 'customers',
  comment: '일반 회원 정보',
})
@Index(['email'], {
  unique: true,
  where: '"isDeleted" = false',
})
export class Customer extends BaseModel {
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

  @Column({ type: 'boolean', default: true, comment: '회원 활성 여부' })
  isActive: boolean;
}
