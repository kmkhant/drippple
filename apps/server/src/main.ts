import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const appUrl = configService.get<string>('app.url');

  // Middleware
  app.enableCors({ origin: [appUrl], credentials: true });
  app.enableShutdownHooks();

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Server Port
  const port = configService.get<number>('app.port');
  await app.listen(port);

  Logger.log(`Server is up and running at port: ${port}`);
}
bootstrap();
