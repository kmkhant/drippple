import {
  Module,
  ClassSerializerInterceptor,
  HttpException,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
// HTTP Filter
// Fonts Module
// Integration Module
import { MailModule } from './mail/mail.module';
import { UsersModule } from '@/users/users.module';

import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ShotModule } from '@/shots/shot.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/assets',
      rootPath: join(__dirname, 'assets'),
    }),
    ScheduleModule.forRoot(),
    ConfigModule,
    DatabaseModule,
    AppModule,
    AuthModule,
    ShotModule,
    MailModule.register(),
    UsersModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
