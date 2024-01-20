import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"

export class CustomerNotFoundError extends BaseError {
    constructor(id: string) {
        const message = `Client com o ID ${id} não existe.`
        super(message, StatusCodes.NOT_FOUND, "CUSTOMER_NOT_FOUND_ERROR")
        this.name = "CustomerNotFoundError"
    }
}
