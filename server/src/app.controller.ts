import { Controller, Get, Req } from '@nestjs/common';

import { Request } from 'express';
import { AppService } from './app.service';

const sleep = (time: number) => new Promise((res) => setTimeout(res, time));

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() req: Request) {
    let close = false;
    req.on('close', () => {
      close = true;
      console.log('close');
    });

    await sleep(3000);

    if (!close) {
      return {
        data: this.appService.getHello(),
      };
    } else {
      console.log('Oh ow');
    }
  }
}
