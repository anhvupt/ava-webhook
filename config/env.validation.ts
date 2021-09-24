import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  validateSync,
  ValidatorOptions,
} from 'class-validator';

enum Environment {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment) NODE_ENV: Environment;
  @IsNumber() PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  } as ValidatorOptions);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
