import { StatusCodes } from "http-status-codes"

import { AppError } from "@/errors/AppError.ts"

export class InvoiceNotFoundError extends AppError {
    constructor(id: string) {
        const message = `Invoice com o ID:${id} não encontrado.`
        super(message, StatusCodes.NOT_FOUND, "NOT_FOUND_ERROR")
        this.name = "InvoiceNotFoundError"
    }
}
