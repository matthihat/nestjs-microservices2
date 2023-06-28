import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
      { ...microserviceOptions, transport: Transport.RMQ },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
