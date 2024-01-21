import { BaseError } from "@/errors/BaseError.ts"
import { StatusCodes } from "http-status-codes"

export class RentalDateError extends BaseError {
    constructor(startDate: Date, endDate: Date) {
        const message = `A data está incorreta, início do aluguel: ${startDate} - fim do aluguel: ${endDate}.`
        super(message, StatusCodes.NOT_FOUND, "NOT_FOUND_ERROR")
        this.name = "RentalNotFoundError"
    }
}
