import { ENV } from "@/libs/env.ts";
import { NextFunction, Request, Response } from "express";

export class LogMiddleware {
  
    static DATE_FORMATTER = Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    });

    public static execute(req: Request, _: Response, next: NextFunction) {
      function isEmpty(object: Record<string, string | Date | number>) {
        return Object.keys(object).length === 0;
      }
  
      const date = LogMiddleware.DATE_FORMATTER.format(new Date());
      const env = ENV.NODE_ENV;
  
      let params = isEmpty(req.params) ? '' : `\nParams: ${JSON.stringify(req.params, null, 2)}`;
      let body = isEmpty(req.body) ? '' : `\nBody: ${JSON.stringify(req.body, null, 2)}`;
  

      if(env === "development"){
        console.log(`
Request Log: ${date}
Info: ${req.method} ${req.originalUrl}${params}${body}
`);   
      }

      if(env === "production"){
        console.log(`
[${date}] [${req.method} ${req.originalUrl}]
        `)
      } 
    
    next();
  }
}



