/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post, Put,Delete, ParseUUIDPipe, ParseEnumPipe, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType, data } from './data';
import {v4 as uuid} from 'uuid'
import { CreateReportDto, ReportReponseDto, UpdateReportDto } from './Dto/report.dto';
@Controller('reports/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string):ReportReponseDto[] { 
    const incomingtype = type==='income'? ReportType.INCOME:ReportType.EXPENSE;
    return this.appService.getAllReports(incomingtype);
  }
  @Get(':id')
  getReportById(
    @Param('id',ParseUUIDPipe) id:string,
    @Param('type',new ParseEnumPipe(ReportType)) type:string):ReportReponseDto{
    const incomingtype = type==='income'? ReportType.INCOME:ReportType.EXPENSE;
    return this.appService.getReportById(incomingtype,id);
  }
  @Post()
  createReport(
    @Body() {amount,source}:CreateReportDto,
    @Param('type') type:string):ReportReponseDto{
      const incomingtype = 
         type==='income'? ReportType.INCOME:ReportType.EXPENSE;
      return this.appService.createReport({amount,source},incomingtype)
  }

  @Put(':id')
  updateReport(@Param('id')id:string,@Body() body:UpdateReportDto,@Param('type') type:string):ReportReponseDto{
    const reportType= type ==='income'?ReportType.INCOME:ReportType.EXPENSE
    return this.appService.updateReport(reportType,id,body)
  }
  
  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id')id:string,@Param('type') type:string){
    const reportType=type === 'income'?ReportType.INCOME:ReportType.EXPENSE
  return this.appService.deleteReport(id,reportType)
  }
}
