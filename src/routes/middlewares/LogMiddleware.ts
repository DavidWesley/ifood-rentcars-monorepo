import { ENV } from "@repo/env"
import { NextFunction, Request, Response } from "express"

export class LogMiddleware {
    private static DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "medium",
        timeZone: "America/Sao_Paulo",
    })

    private static JSON_FORMATTER = (value: object) => {
        return JSON.stringify(value, null, 2)
    }

    public static handle(req: Request, res: Response, next: NextFunction) {
        const isEmpty = (object: object) => {
            if (!object) return true
            return Object.keys(object).length === 0
        }

        const now = new Date()
        const dateTimeString = LogMiddleware.DATE_FORMATTER.format(now)

        const requestInfoObject = {
            params: isEmpty(req.params) ? {} : req.params,
            query: isEmpty(req.query) ? {} : req.query,
            body: isEmpty(req.body) ? {} : req.body,
        }

        const requestInfo = LogMiddleware.JSON_FORMATTER(requestInfoObject)

        switch (ENV.NODE_ENV) {
            case "production":
                console.log(`[LOG] ${dateTimeString} ${req.method} ${req.originalUrl}`)
                break
            case "development":
                console.group(`[LOG] ${dateTimeString} ${req.method} ${req.url}`)
                if (requestInfo !== "") console.log(requestInfo)
                console.groupEnd()
                break
            case "test":
                break
            default:
                break
        }

        next()
    }
}
