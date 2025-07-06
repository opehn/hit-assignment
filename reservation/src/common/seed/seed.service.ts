import { Injectable } from '@nestjs/common';
import { CustomerService } from '../../customer/customer.service';
import { MenuCategoryService } from '../../menu-category/menu-category.service';
import { OwnerService } from '../../owner/owner.service';
import { InternalServerErrorBaseException } from '../base.exception';
import { Customer } from '../entity/customer.entity';
import { Owner } from '../entity/owner.entity';
import { DATABASE_OPERATION_ERROR_CODE } from '../error-codes';
import { MenuData } from './data/menu-category.data';
import { generateOwnerSeed } from './data/owner.data';
import { generateUserSeed } from './data/user.data';
import { MenuCategory } from '../entity/menu-category.entity';

@Injectable()
export class SeedingService {
  constructor(
    private readonly userService: CustomerService,
    private readonly ownerService: OwnerService,
    private readonly menuCategoryService: MenuCategoryService,
  ) {}

  async seed(): Promise<void> {
    try {
      const userData = await generateUserSeed();
      const ownerData = await generateOwnerSeed();

      await Promise.all([
        this.userService.bulkInsertOrUpdate(userData as Partial<Customer>[]),
        this.ownerService.bulkInsertOrUpdate(ownerData as Partial<Owner>[]),
        this.menuCategoryService.save(MenuData as Partial<MenuCategory>[]),
      ]);
    } catch (error: any) {
      throw new InternalServerErrorBaseException(
        DATABASE_OPERATION_ERROR_CODE,
        `Failed to process seed data: ${error.message}`,
      );
    }
  }
}
