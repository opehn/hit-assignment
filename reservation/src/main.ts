import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http.exception-filter';
import { GlobalResponseInterceptor } from './util/response';
import { setupSwagger } from './util/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  // app.use(cookieParser());

  /**
   *  transform: class-transformer 어노테이션 옵션을 활성화
   *  whitelist: 유효하지 않는 옵션 제거
   *  forbidNonWhitelisted: 유효성 검사 이후 잘못된 사항 에러노출
   */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env['PORT'] ?? 3000);
}

bootstrap();
