import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseModel {
  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdDateTime: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  createdById: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedDateTime: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedById: string;

  @Column({ type: 'timestamp', nullable: true })
  deletedDateTime: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deletedById: string;
}
