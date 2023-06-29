import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionsHandler } from './GlobalExceptionsHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up Global exception handler
  const globalExceptionsHandler = new GlobalExceptionsHandler();
  app.useGlobalFilters(globalExceptionsHandler);
  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
