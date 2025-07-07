import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Customer } from '../common/entity/customer.entity';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  async findByEmail(email: string): Promise<Customer | null> {
    return await this.repository.findOne({
      where: { email, isDeleted: false },
    });
  }

  async bulkInsertOrUpdate(data: Partial<Customer>[], qr?: QueryRunner) {
    const source = qr ? qr.manager.getRepository(Customer) : this.repository;
    await source
      .createQueryBuilder()
      .insert()
      .into(Customer)
      .values(data)
      .orUpdate(['email', 'name', 'password'], ['email'], {
        indexPredicate: '"isDeleted" = false',
      })
      .execute();
  }
}
