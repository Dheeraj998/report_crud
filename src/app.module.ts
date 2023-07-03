/* eslint-disable prettier/prettier */
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomInterceptor } from './custom.interceptor';
import { ReportModule } from './report/report.module';
import { SummaryModule } from './summary/summary.module';

@Module({
  imports: [ ReportModule, SummaryModule],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_INTERCEPTOR,
    //if custom need to add custom interceptor eg:
    // useClass:CustomInterceptor
    useClass:ClassSerializerInterceptor
  }],
})
export class AppModule {}
