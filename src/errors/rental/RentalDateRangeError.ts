import { StatusCodes } from "http-status-codes"

import { AppError } from "@/errors/AppError.ts"

export class RentalDateRangeError extends AppError {
    constructor(start: Date, end: Date) {
        const message = `A data está incorreta, início do aluguel: ${start} - fim do aluguel: ${end}.`
        super(message, StatusCodes.BAD_REQUEST, "TIME_RANGE_ERROR")
        this.name = "RentalDateRangeError"
    }
}
