import { ENV } from "@/env.ts"
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

    public static handle(req: Request, _: Response, next: NextFunction) {
        const isEmpty = (object: object) => {
            if (!object) return true
            return Object.keys(object).length === 0
        }

        const now = new Date()
        const dateTimeString = LogMiddleware.DATE_FORMATTER.format(now)

        const body = isEmpty(req.body) ? "" : `Body: ${LogMiddleware.JSON_FORMATTER(req.body)}`
        const params = isEmpty(req.params) ? "" : `Params: ${LogMiddleware.JSON_FORMATTER(req.params)}`
        const query = isEmpty(req.query) ? "" : `Query: ${LogMiddleware.JSON_FORMATTER(req.query)}`

        const requestInfo = [params, query, body].filter(Boolean).join("\n")

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
