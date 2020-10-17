import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Header('Content-Type', 'text/html')
  getHello(): { name: string } {
    return { name: 'Cleomir' };
  }
}
