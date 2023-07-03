/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { HttpCode, Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import {v4 as uuid} from 'uuid'
import {  ReportReponseDto } from 'src/Dto/report.dto';

interface Report{
  amount:number,
  source:string
}
interface UpdateReport{
  amount?:number,
  aource?:string
}

@Injectable()
export class ReportService {
  getAllReports(incomingtype:ReportType):ReportReponseDto[]{
    return data.report.filter((report)=>report.type===incomingtype).
    map(report=> new ReportReponseDto(report))
  }

  getReportById(type:ReportType,id:string):ReportReponseDto{
    const report= data.report
    .filter((report)=>report.type===type)
    .find(report=>report.id===id);
    if(!report) return;
    return new ReportReponseDto(report)
  }
  createReport({amount,source}:Report,type:ReportType):ReportReponseDto{
    const newReport={
      id:uuid(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type: type=== 'income'?ReportType.INCOME:ReportType.EXPENSE
    }
    data.report.push(newReport) 
    return new ReportReponseDto(newReport)
  }

  updateReport(reportType:ReportType,id:string,body:UpdateReport):ReportReponseDto{
    const updateData=  data.report
  .filter((report)=>report.type===reportType)
  .find((report)=>report.id===id)
  if(!updateData) return 
  //  {msg:"doesn't exist"}
  const reportIndex= data.report.findIndex((report)=>report.id===updateData.id)

  data.report[reportIndex]={
    ...data.report[reportIndex],
    ...body
  }
    return new ReportReponseDto( data.report[reportIndex])
  }

  deleteReport(id:string,reportType:ReportType){
    const deletingData= data.report.filter((report)=>report.type===reportType).find((report)=>report.id===id)

    if(!deletingData) return {msg:"no item found"}
    const findIndex=data.report.findIndex((report)=>report.id===id)
    if(findIndex===-1) return;
    data.report.splice(findIndex,1)
    return 'deleted successfully'
  }
}
