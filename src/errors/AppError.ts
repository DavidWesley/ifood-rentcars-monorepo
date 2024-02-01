import { StatusCodes } from "http-status-codes"

import { ErrorCodeStringType } from "@/errors/errors.ts"

export interface AppErrorProps {
    statusCode: StatusCodes
    errorCode: string
}

export abstract class AppError extends Error implements AppErrorProps {
    statusCode: number
    errorCode: string

    constructor(message: string, statusCode: number = StatusCodes.BAD_REQUEST, errorCode: ErrorCodeStringType) {
        super(message)
        this.name = "AppError"
        this.statusCode = statusCode
        this.errorCode = errorCode

        Object.setPrototypeOf(this, AppError.prototype)
    }
}
