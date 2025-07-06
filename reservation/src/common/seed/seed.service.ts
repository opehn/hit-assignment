import { Injectable } from '@nestjs/common';
import { CustomerService } from '../../customer/customer.service';
import { OwnerService } from '../../owner/owner.service';
import { InternalServerErrorBaseException } from '../base.exception';
import { Customer } from '../entity/customer.entity';
import { Owner } from '../entity/owner.entity';
import { DATABASE_OPERATION_ERROR_CODE } from '../error-codes';
import { generateOwnerSeed } from './data/owner.data';
import { generateUserSeed } from './data/user.data';

@Injectable()
export class SeedingService {
  constructor(
    private readonly userService: CustomerService,
    private readonly ownerService: OwnerService,
  ) {}

  async seed(): Promise<void> {
    try {
      const userData = await generateUserSeed();
      const ownerData = await generateOwnerSeed();

      await Promise.all([
        this.userService.bulkInsertOrUpdate(userData as Partial<Customer>[]),
        this.ownerService.bulkInsertOrUpdate(ownerData as Partial<Owner>[]),
      ]);
    } catch (error: any) {
      throw new InternalServerErrorBaseException(
        DATABASE_OPERATION_ERROR_CODE,
        `Failed to process seed data: ${error.message}`,
      );
    }
  }
}
