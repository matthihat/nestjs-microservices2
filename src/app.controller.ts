import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MICROSERVICE1') private readonly client: ClientProxy,
  ) {
    console.log(process.env['NODE_ENV']);
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
