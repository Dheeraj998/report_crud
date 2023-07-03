/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post, Put,Delete, ParseUUIDPipe, ParseEnumPipe, HttpCode } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { CreateReportDto, ReportReponseDto, UpdateReportDto } from 'src/Dto/report.dto';
import { ReportService } from './report.service';
@Controller('reports/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(@Param('type') type: string):ReportReponseDto[] { 
    const incomingtype = type==='income'? ReportType.INCOME:ReportType.EXPENSE;
    return this.reportService.getAllReports(incomingtype);
  }
  @Get(':id')
  getReportById(
    @Param('id',ParseUUIDPipe) id:string,
    @Param('type',new ParseEnumPipe(ReportType)) type:string):ReportReponseDto{
    const incomingtype = type==='income'? ReportType.INCOME:ReportType.EXPENSE;
    return this.reportService.getReportById(incomingtype,id);
  }
  @Post()
  createReport(
    @Body() {amount,source}:CreateReportDto,
    @Param('type') type:string):ReportReponseDto{
      const incomingtype = 
         type==='income'? ReportType.INCOME:ReportType.EXPENSE;
      return this.reportService.createReport({amount,source},incomingtype)
  }

  @Put(':id')
  updateReport(@Param('id')id:string,@Body() body:UpdateReportDto,@Param('type') type:string):ReportReponseDto{
    const reportType= type ==='income'?ReportType.INCOME:ReportType.EXPENSE
    return this.reportService.updateReport(reportType,id,body)
  }
  
  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id')id:string,@Param('type') type:string){
    const reportType=type === 'income'?ReportType.INCOME:ReportType.EXPENSE
  return this.reportService.deleteReport(id,reportType)
  }
}
