import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { EntryDto, WebhookEventDto } from './dto/webhook.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

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

    if (body.object === 'page') {
      const entries: EntryDto[] = body['entry'];
      entries.forEach((entry) => {
        const messaging = entry.messaging[0];
        console.log(messaging);
      });
      return 'EVENT_RECEIVED';
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
