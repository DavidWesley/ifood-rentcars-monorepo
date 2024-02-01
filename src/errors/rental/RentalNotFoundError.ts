import { StatusCodes } from "http-status-codes"

import { AppError } from "@/errors/AppError.ts"

export class RentalNotFoundError extends AppError {
    constructor(rentalId: string) {
        const message = `Aluguel com o id:${rentalId} não encontrado`
        super(message, StatusCodes.NOT_FOUND, "NOT_FOUND_ERROR")
        this.name = "RentalNotFoundError"
    }
}
