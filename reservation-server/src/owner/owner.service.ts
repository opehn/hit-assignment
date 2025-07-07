import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Owner } from '../common/entity/owner.entity';
import { OwnerRepository } from './owner.repository';

@Injectable()
export class OwnerService {
  constructor(private readonly repository: OwnerRepository) {}

  async findByEmail(email: string): Promise<Owner | null> {
    return await this.repository.findByEmail(email);
  }

  async bulkInsertOrUpdate(data: Partial<Owner>[], qr?: QueryRunner) {
    return await this.repository.bulkInsertOrUpdate(data, qr);
  }
}
