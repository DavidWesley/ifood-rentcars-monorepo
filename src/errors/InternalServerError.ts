import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"

export class InternalServerError extends BaseError {
    constructor(message: string) {
        super(message, StatusCodes.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR")
        this.name = "InternalServerError"
    }
}
