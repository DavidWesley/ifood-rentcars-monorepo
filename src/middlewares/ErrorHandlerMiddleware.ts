import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"
import { ValidationError } from "@/errors/ValidationError.ts"

export class ErrorHandlerMiddleware {
    public static handle(err: Error, _: Request, res: Response, next: NextFunction) {
        if (err instanceof ValidationError) {
            res.status(err.statusCode).send({
                code: err.errorCode,
                message: err.message,
                errors: err.fieldValidationErrors,
            })
        } else if (err instanceof BaseError) {
            res.status(err.statusCode).send({
                name: err.name,
                message: err.message,
                code: err.errorCode,
            })
        } else if (err instanceof Error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                message: err.message,
            })
        }

        next()
    }
}
