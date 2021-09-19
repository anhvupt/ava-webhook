import { HttpClientService } from './httpClient.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
    imports: [HttpModule],
    providers: [HttpClientService]
})
export class CommonModule {}
