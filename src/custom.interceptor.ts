/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";

export class CustomInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, handler: CallHandler) {
    console.log("intercepting the request");

    
    return handler.handle().pipe(map((data)=>{
        console.log('This is intercepting the response');
const response = {
    ...data,
    createdAt:data.created_at
}
delete response.created_at
delete response.updated_at

        return response

        
    }))
  }
}