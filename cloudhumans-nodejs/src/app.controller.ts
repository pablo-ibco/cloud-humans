import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CloudPro Application')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  serverUp(): string {
    return this.appService.serverUp();
  }
}
