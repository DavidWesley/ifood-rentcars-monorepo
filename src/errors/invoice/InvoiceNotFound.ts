import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"

export class InvoiceNotFoundError extends BaseError {
    constructor(id: string) {
        const message = `Invoice com o ID:${id} não encontrado.`
        super(message, StatusCodes.NOT_FOUND, "NOT_FOUND_ERROR")
        this.name = "InvoiceNotFoundError"
    }
}
