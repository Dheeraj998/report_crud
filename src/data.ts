/* eslint-disable prettier/prettier */

export enum ReportType{
    INCOME='income',
    EXPENSE='expense'
}
export const data:Data={
    report:[
        {
            id:"1",
            source:"Salary",
            amount:2000,
            created_at: new Date(),
            updated_at:new Date(),
            type:ReportType.INCOME
        },
        {
            id:"2",
            source:"Rummy",
            amount:20000,
            created_at: new Date(),
            updated_at:new Date(),
            type:ReportType.INCOME
        },
        {
            id:"3",
            source:"Breakfast",
            amount:200,
            created_at: new Date(),
            updated_at:new Date(),
            type:ReportType.EXPENSE
        },
    ]
};

interface Data{
  report:{ 
    id:string,
    source:string,
    amount:number,
    created_at:Date,
    updated_at:Date,
    type:ReportType
  }[];
}

