import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"

export class RentalNotFoundError extends BaseError {
    constructor(rentalId: string) {
        const message = `Aluguel com o id:${rentalId} não encontrado`
        super(message, StatusCodes.NOT_FOUND, "NOT_FOUND_ERROR")
        this.name = "RentalNotFoundError"
    }
}
