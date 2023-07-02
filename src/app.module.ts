import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WinstonLoggerModule } from './winston-logger.module';
import { GlobalExceptionsHandler } from './GlobalExceptionsHandler';

const microserviceOptions = {
  name: 'MICROSERVICE1',
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://rabbitmq:5672'],
    queue: 'microservice_queue',
    queueOptions: { durable: false },
  },
};

@Module({
  imports: [
    ClientsModule.register([
      { ...microserviceOptions, transport: Transport.RMQ }, // Register to be able to communicate through RMQ.
    ]),
    WinstonLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, GlobalExceptionsHandler],
})
export class AppModule {}
