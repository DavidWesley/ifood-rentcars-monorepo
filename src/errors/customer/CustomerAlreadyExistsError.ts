import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"

export class CustomerAlreadyExistsError extends BaseError {
    constructor(message: string) {
        super(message, StatusCodes.CONFLICT, "CUSTOMER_ALREADY_EXISTS_ERROR")
        this.name = "CustomerAlreadyExistsError"
    }
}
