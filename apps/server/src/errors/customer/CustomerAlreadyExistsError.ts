import { StatusCodes } from "http-status-codes"

import { AppError } from "@/errors/AppError.ts"

export class CustomerAlreadyExistsError extends AppError {
    constructor(message: string) {
        super(message, StatusCodes.CONFLICT, "ALREADY_EXISTS_ERROR")
        this.name = "CustomerAlreadyExistsError"
    }
}
