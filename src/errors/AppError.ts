import { StatusCodes } from "http-status-codes"

export type ErrorCodeType =
    | "ALREADY_EXISTS"
    | "NOT_FOUND"
    | "VALIDATION"
    | "UNAVAILABLE"
    | "INVALID_TYPE"
    | "TIME_RANGE"
    | "LIMIT_EXCEEDED"
    | "INVALID_OPERATION"

export type ErrorCodeStringType = `${Uppercase<ErrorCodeType>}_ERROR`

export interface AppErrorProps {
    statusCode: StatusCodes
    errorCode: string
}

export abstract class AppError extends Error implements AppErrorProps {
    statusCode: number
    errorCode: string

    constructor(message: string, statusCode: StatusCodes, errorCode: ErrorCodeStringType) {
        super(message)
        this.name = "AppError"
        this.statusCode = statusCode
        this.errorCode = errorCode

        Object.setPrototypeOf(this, AppError.prototype)
    }
}
