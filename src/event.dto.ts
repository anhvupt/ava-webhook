import { ApiProperty } from '@nestjs/swagger';

export class Sender {
  id: string; // PSID
}

export class Recipient {
  id: string; // PageId
}

export class Messaging<TInfo> {
  sender: Sender;
  recipient: Recipient;
  timestamps: number;
  message: TInfo;
}

export class MessageInfo {
  mid: string; //message id
}

export class TextMessage extends MessageInfo {
  text: string;
  quick_reply: unknown;
}

export class ReplyMessage extends MessageInfo {
  text: string;
  quick_reply: unknown;
}

export class Entry {
  id: string;
  time: number;
  messaging: Messaging<MessageInfo>[];
}

export class WebhookEventDto {
  @ApiProperty() object: string;
  @ApiProperty() entry: Entry[];
}
