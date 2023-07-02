import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionsHandler } from './GlobalExceptionsHandler';
import { WinstonLogger } from '@matthihat/customlogger';

async function bootstrap() {
  // Create Nest app
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WinstonLogger);
  app.useLogger(logger);

  // Set up global exception handler
  const globalExceptionsHandler = app.get<GlobalExceptionsHandler>(
    GlobalExceptionsHandler,
  );
  app.useGlobalFilters(globalExceptionsHandler);
  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
