import { StatusCodes } from "http-status-codes"

import { AppError } from "@/errors/AppError.ts"

export class CustomerNotFoundError extends AppError {
    constructor(id: string) {
        const message = `Client com o ID ${id} não existe.`
        super(message, StatusCodes.NOT_FOUND, "NOT_FOUND_ERROR")
        this.name = "CustomerNotFoundError"
    }
}
