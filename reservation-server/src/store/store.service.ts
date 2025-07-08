import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { StoreRepository } from './store.repository';

@Injectable()
export class StoreService {
  constructor(private readonly repository: StoreRepository) {}

  async findOne(id: number, qr?: QueryRunner) {
    return await this.repository.findOne(id, qr);
  }
}
