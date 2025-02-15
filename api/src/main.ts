import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionsFilter } from './common/filters/http-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { DatabaseExceptionsFilter } from './common/filters/database-exceptions.filter';
import { DefaultExceptionsFilter } from './common/filters/default-exceptions.filter';
import { LoggerService } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor());
  const loggerService = app.get(LoggerService);

  app.useGlobalFilters(
    new DefaultExceptionsFilter(loggerService),
    new DatabaseExceptionsFilter(loggerService),
    new HttpExceptionsFilter(loggerService),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 7777);
}

bootstrap();
