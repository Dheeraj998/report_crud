/* eslint-disable prettier/prettier */

import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ReportType } from "src/data";

export class CreateReportDto{
    @IsNumber()
    @IsPositive()
    amount:number;
    @IsString()
    @IsNotEmpty()
    source:string;
}

export class UpdateReportDto{
    @IsOptional()
    @IsNumber()
    amount:number;
    @IsString()
    @IsOptional()
    source:string;
}

export class ReportReponseDto{
    id:string;
    source:string;
    amount:number;
    @Exclude()
    created_at:Date;
    @Exclude()
    updated_at:Date;
    type:ReportType;

    @Expose({name:'createdAt'})
    transformCreatedAt(){
      return this.created_at;  
    }

    constructor(partial:Partial<ReportReponseDto>){
        Object.assign(this,partial)
    }
}


