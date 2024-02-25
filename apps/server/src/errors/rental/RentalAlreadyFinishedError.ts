import { StatusCodes } from "http-status-codes"

import { AppError } from "@/errors/AppError.ts"

export class RentalAlreadyFinishedError extends AppError {
    constructor(message: string) {
        super(message, StatusCodes.CONFLICT, "INVALID_OPERATION_ERROR")
        this.name = "RentalAlreadyFinishedError"
    }
}
