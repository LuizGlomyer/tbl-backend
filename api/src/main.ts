import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
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
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT || 7777;
  const host = process.env.HOST || 'localhost';
  await app.listen(port);
  Logger.debug(`🚀 API running at: http://${host}:${port}`, 'Bootstrap');
}

bootstrap();
