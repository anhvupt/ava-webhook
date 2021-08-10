import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration/config.service';
import defaultLocal from 'config/default.local';
import { validate } from 'config/env.validation';

const configOptions: ConfigModuleOptions = {
  load: [defaultLocal],
  isGlobal: true,
  cache: true,
  expandVariables: true,
  ...validate
};

@Module({
  imports: [ConfigModule.forRoot(configOptions)],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class SharedModule {}
