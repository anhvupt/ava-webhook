import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedModule } from './shared/shared.module';
import { WebhookController } from './webhook/webhook.controller';
import { WebhookModule } from './webhook/webhook.module';
import { WebhookService } from './webhook/webhook.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [SharedModule, WebhookModule, CommonModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class AppModule {}
