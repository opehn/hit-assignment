import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Owner } from '../common/entity/owner.entity';

@Injectable()
export class OwnerRepository {
  constructor(
    @InjectRepository(Owner)
    private readonly repository: Repository<Owner>,
  ) {}

  async findByEmail(email: string): Promise<Owner | null> {
    return await this.repository.findOne({
      where: { email, isDeleted: false },
    });
  }

  async bulkInsertOrUpdate(data: Partial<Owner>[], qr?: QueryRunner) {
    const source = qr ? qr.manager.getRepository(Owner) : this.repository;
    await source
      .createQueryBuilder()
      .insert()
      .into(Owner)
      .values(data)
      .orUpdate(['email', 'name', 'password'], ['email'], {
        indexPredicate: '"isDeleted" = false',
      })
      .execute();
  }
}
