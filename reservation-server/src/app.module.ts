import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BearerTokenGuard } from './common/guard/bearer-token.guard';
import { SeedingService } from './common/seed/seed.service';
import { CustomerModule } from './customer/customer.module';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { MenuModule } from './menu/menu.module';
import { OwnerModule } from './owner/owner.module';
import { dataSourceOptions } from './util/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secrettt',
      signOptions: { expiresIn: '24h' },
      global: true,
    }),
    AuthModule,
    CustomerModule,
    OwnerModule,
    MenuCategoryModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SeedingService,
    {
      provide: APP_GUARD,
      useClass: BearerTokenGuard,
    },
  ],
})
export class AppModule {}
