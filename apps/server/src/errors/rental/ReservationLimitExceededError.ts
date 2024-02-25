import { StatusCodes } from "http-status-codes"

import { AppError } from "@/errors/AppError.ts"

export class ReservationLimitExceededError extends AppError {
    constructor(message: string) {
        super(message, StatusCodes.CONFLICT, "LIMIT_EXCEEDED_ERROR")
        this.name = "ReservationLimitExceededError"
    }
}
