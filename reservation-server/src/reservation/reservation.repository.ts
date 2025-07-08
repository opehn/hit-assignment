import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Owner } from '../common/entity/owner.entity';
import { Reservation } from '../common/entity/reservation.entity';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly repository: Repository<Reservation>,
  ) {}

  async save(data: Partial<Reservation>, qr?: QueryRunner) {
    const source = qr ? qr.manager.getRepository(Reservation) : this.repository;

    return await source.save(data);
  }

  async update(id: number, data: Partial<Reservation>, qr?: QueryRunner) {
    const source = qr ? qr.manager.getRepository(Reservation) : this.repository;

    return await source.update(id, data);
  }

  async softDelete(id: number, user: Partial<Owner>, qr?: QueryRunner) {
    const source = qr ? qr.manager.getRepository(Reservation) : this.repository;

    return await source.update(id, { isDeleted: true, deletedById: user.id });
  }
}
