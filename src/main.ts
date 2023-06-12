import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import './config/dotenv.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('config.port'), '0.0.0.0', () => {
    Logger.log(
      `app listening at ${configService.get<number>('config.port')} with env ${configService.get<number>(
        'config.environment'
      )}`,
      'main.ts'
    );
  });
}

bootstrap();
