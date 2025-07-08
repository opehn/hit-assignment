import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import {
  BaseException,
  InternalServerErrorBaseException,
} from '../exception/base.exception';
import { DATABASE_OPERATION_ERROR_CODE } from '../exception/error-codes';

@Injectable()
export class TransactionService {
  constructor(private readonly dataSource: DataSource) {}

  async executeTransaction<T>(
    callback: (queryRunner: QueryRunner) => Promise<T>,
    exQueryRunner?: QueryRunner,
  ): Promise<T> {
    const queryRunner = exQueryRunner || this.dataSource.createQueryRunner();

    const isOwnQueryRunner = !exQueryRunner;
    let isStartedTransaction = false;

    try {
      if (isOwnQueryRunner) {
        await queryRunner.connect();
      }

      if (!queryRunner.isTransactionActive) {
        await queryRunner.startTransaction();
        isStartedTransaction = true;
      }

      const result = await callback(queryRunner);

      if (isStartedTransaction && queryRunner.isTransactionActive) {
        await queryRunner.commitTransaction();
      }

      return result;
    } catch (error) {
      if (isStartedTransaction && queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }

      if (error instanceof BaseException) {
        throw error;
      }

      throw new InternalServerErrorBaseException(
        DATABASE_OPERATION_ERROR_CODE,
        error.message,
      );
    } finally {
      if (isOwnQueryRunner) {
        await queryRunner.release();
      }
    }
  }
}
