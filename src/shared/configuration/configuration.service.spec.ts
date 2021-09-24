import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService as ConfigurationService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationService],
    }).compile();

    service = module.get<ConfigurationService>(ConfigurationService);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
