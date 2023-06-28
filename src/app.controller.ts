import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log('Harry init');
  }

  @Get()
  getHello(): string {
    console.log('Helloz');
    return this.appService.getHello();
  }
}
