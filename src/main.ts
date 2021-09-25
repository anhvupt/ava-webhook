import { Configuration } from './shared/configuration/config.enum';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  const config = new DocumentBuilder()
    .setTitle('ava-webhook')
    .setDescription('The ava-webhook API description')
    .setVersion('1.0')
    .addTag('webhook')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port: number = (configService.get(Configuration.PORT || 3000)) || 3000;
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
