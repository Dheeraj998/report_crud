/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post, Put,Delete, ParseUUIDPipe, ParseEnumPipe, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType, data } from './data';
import {v4 as uuid} from 'uuid'
import { CreateReportDto, ReportReponseDto, UpdateReportDto } from './Dto/report.dto';
@Controller('')
export class AppController {
 
}
