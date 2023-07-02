import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { WinstonLogger } from '@matthihat/customlogger';
import { SERVICENAME } from './constants';

@Controller()
export class AppController {
  private readonly logger = new WinstonLogger();

  constructor(
    private readonly appService: AppService,
    @Inject('MICROSERVICE1') private readonly client: ClientProxy,
  ) {
    this.logger.debug('Instantiating ' + SERVICENAME);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/send')
  async sendEvent(message: string) {
    return await firstValueFrom(
      this.client.emit('message_pattern', 'Hello from MS2'),
    );
  }

  @Get('/sendMessage')
  async sendMessage(message: string) {
    const response = await firstValueFrom(
      this.client.send<string>('message_pattern', 'Hello from MS2'),
    );
    console.log(response);
  }
}
