import { NextFunction, Request, Response } from "express"
import { RequestPropertiesNameType } from "./ValidateRequestSchemaMiddleware.ts"

export class LogMiddleware {
    private static DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "medium",
        timeZone: "America/Sao_Paulo",
    })

    private static JSON_FORMATTER = (value: object | null) => {
        return JSON.stringify(value, null, 2)
    }

    public static handle(req: Request, _: Response, next: NextFunction) {
        const isEmpty = (object: object | null) => {
            if (object === null) return true
            return Reflect.ownKeys(object).length === 0
        }

        const now = new Date()
        const dateTimeString = LogMiddleware.DATE_FORMATTER.format(now)

        const requestInfoTupleArray: Array<[RequestPropertiesNameType, object | null]> = [
            ["params", req.params],
            ["query", req.query],
            ["body", req.body],
        ]

        const requestInfoObject = requestInfoTupleArray.filter(([_, obj]) => !isEmpty(obj))
        const requestInfoMessage = LogMiddleware.JSON_FORMATTER(requestInfoObject)

        switch (process.env.NODE_ENV) {
            case "production":
                console.log("[LOG] %s %s %s", dateTimeString, req.method, req.originalUrl)
                break
            case "test":
                break
            default:
                console.log("[LOG] %s %s %s", dateTimeString, req.method, req.url)
                if (requestInfoObject.length > 0) console.log(requestInfoMessage)
                console.groupEnd()
                break
        }

        next()
    }
}
