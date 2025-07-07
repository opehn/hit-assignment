import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Customer } from '../common/entity/customer.entity';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly repository: CustomerRepository) {}

  async findByEmail(email: string): Promise<Customer | null> {
    return await this.repository.findByEmail(email);
  }

  async bulkInsertOrUpdate(data: Partial<Customer>[], qr?: QueryRunner) {
    return await this.repository.bulkInsertOrUpdate(data, qr);
  }
}
