import { Module } from '@nestjs/common';

import { SharedModule } from './shared/shared.module';
import { WebhookController } from './webhook/webhook.controller';
import { WebhookModule } from './webhook/webhook.module';
import { WebhookService } from './webhook/webhook.service';

@Module({
  imports: [SharedModule, WebhookModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class AppModule {}
