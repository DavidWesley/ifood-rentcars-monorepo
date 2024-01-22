import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"

export class RentalDateRangeError extends BaseError {
    constructor(start: Date, end: Date) {
        const message = `A data está incorreta, início do aluguel: ${start} - fim do aluguel: ${end}.`
        super(message, StatusCodes.BAD_REQUEST, "RENTAL_DATE_RANGE_ERROR")
        this.name = "RentalDateRangeError"
    }
}
