import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { query, Request } from 'express';
import { AppService } from './app.service';
import { WebhookEventDto } from './event.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private VERIFY_TOKEN = 'ava-bot';

  @Get()
  getWebhook(@Query() query): string {
    const mode: string = query['hub.mode'];
    const token: string = query['hub.verify_token'];
    const challenge: string = query['hub.challenge'];

    if (!!mode && !!token) {
      console.log(mode, token);
      if (mode === 'subscribe' && token === this.VERIFY_TOKEN) {
        console.log('WEBHOOK_VERIFIED');
        return challenge;
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException('Not Acceptable', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post()
  postWebhook(@Body() body: WebhookEventDto): string {
    console.log(body);

    if (body['object'] === 'page') {
      const entries: any[] = body['entry'];
      entries.forEach((entry) => {
        const webhookEvent = entry.messaging[0];
        console.log(webhookEvent);
      });
      return 'EVENT_RECEIVED';
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
