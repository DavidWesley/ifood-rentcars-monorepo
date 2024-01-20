import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"

export class ReservationLimitExceededError extends BaseError {
    constructor(message: string) {
        super(message, StatusCodes.CONFLICT, "RESERVATION_LIMIT_ERROR")
        this.name = "ReservationLimitExceededError"
    }
}
