import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Sender {
  @ApiProperty() id: string; // PSID
}

export class Recipient {
  @ApiProperty() id: string; // PageId
}

export class Messaging<TInfo> {
  @ApiProperty() sender: Sender;
  @ApiProperty() recipient: Recipient;
  @ApiProperty() timestamps: number;
  @ApiProperty() message: TInfo;
}

export class MessageInfo {
  @ApiPropertyOptional() mid: string; //message id
}

export class TextMessage extends MessageInfo {
  @ApiProperty() text: string;
  quick_reply: unknown;
}

export class ReplyMessage extends MessageInfo {
  text: string;
  quick_reply: unknown;
}

export class EntryDto {
  @ApiPropertyOptional() id: string;
  @ApiPropertyOptional() time: number;
  @ApiProperty() messaging: Messaging<MessageInfo>[];
}

export class WebhookEventDto {
  @ApiProperty() object: string;
  @ApiProperty() entry: EntryDto[];
}
