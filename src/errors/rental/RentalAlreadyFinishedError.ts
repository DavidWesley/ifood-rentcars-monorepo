import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"

export class RentalAlreadyFinishedError extends BaseError {
    constructor(message: string) {
        super(message, StatusCodes.CONFLICT, "RENTAL_ALREADY_FINISHED_ERROR")
        this.name = "RentalAlreadyFinishedError"
    }
}
