import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const microserviceOptions: MicroserviceOptions = {
  //   transport: Transport.RMQ,
  //   name: 'MICROSERVICE1',
  //   options: {
  //     urls: ['amqp://rabbitmq:5672'],
  //     queue: 'microservice_queue',
  //     queueOptions: { durable: false },
  //   },
  // };
  //
  // app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
