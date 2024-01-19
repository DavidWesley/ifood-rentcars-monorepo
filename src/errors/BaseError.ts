import { StatusCodes } from "http-status-codes"

export interface BaseErrorProps {
    statusCode: StatusCodes
    errorCode: string
}

export abstract class BaseError extends Error implements BaseErrorProps {
    statusCode: number
    errorCode: string

    constructor(message: string, statusCode: number, errorCode: string = "BASE_ERROR") {
        super(message)
        this.name = "BaseError"
        this.statusCode = statusCode
        this.errorCode = errorCode

        Object.setPrototypeOf(this, BaseError.prototype)
    }
}
