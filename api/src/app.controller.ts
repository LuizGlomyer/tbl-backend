import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as os from 'os';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): string {
    return 'Hello TBL!';
  }

  @Get('health')
  healthCheck(): object {
    return {
      status: 'OK',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuLoad: os.loadavg(),
    };
  }

  @Get('version')
  getVersion(): object {
    return { version: '1.0.0' };
  }
}
