import { Configuration } from './config.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  connectionString: string =
    process.env[Configuration.MONGO_URI] ||
    this.configService.get(Configuration.MONGO_URI);
  private devEnvironment: string = process.env.NODE_ENV
    ? 'production'
    : 'environment';

  constructor(private configService: ConfigService) {}

  getConfiguration(name: string): string {
    return process.env[name] || this.configService.get(name);
  }

  get isDevelopment(): boolean {
    return this.devEnvironment === 'development';
  }
}
