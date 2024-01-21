import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"

export class RentalMatchingFoundError extends BaseError {
    constructor(rentalId:string, customerId: string) {
        const message = `Aluguel com o id:${rentalId} não pertence ao usuário ID: ${customerId}`
        super(message, StatusCodes.NOT_FOUND, "NOT_FOUND_ERROR")
        this.name = "RentalMatchingFoundError"
    }
}
