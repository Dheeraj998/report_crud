/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { ReportService } from 'src/report/report.service';
@Injectable()
export class SummaryService {
    constructor(private readonly reportSerive:ReportService){      
    }
    calculateSummary(){
        const allExpense = this.reportSerive.getAllReports(ReportType.EXPENSE).reduce((sum,report)=>sum+report.amount,0)
        const allIncome = this.reportSerive.getAllReports(ReportType.INCOME).reduce((sum,report)=>sum+report.amount,0)
       
        const total= allIncome + allExpense
        return {
            net_income:allIncome,
            net_expense:allExpense,
            total:total

        }
    }
}
