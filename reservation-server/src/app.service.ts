import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SeedingService } from './common/seed/seed.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedingService) {}

  async onApplicationBootstrap() {
    await this.seedingService.seed();
  }
}
