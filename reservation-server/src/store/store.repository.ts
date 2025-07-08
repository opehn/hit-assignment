import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Store } from '../common/entity/store.entity';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectRepository(Store)
    private readonly repository: Repository<Store>,
  ) {}

  async findOne(id: number, qr?: QueryRunner) {
    const source = qr ? qr.manager.getRepository(Store) : this.repository;

    return await source.findOne({ where: { id } });
  }
}
