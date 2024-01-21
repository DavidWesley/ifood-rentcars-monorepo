import { BaseError } from "@/errors/BaseError.ts"
import { StatusCodes } from "http-status-codes"

export class RentalAlreadyInProgressError extends BaseError {
    constructor(cpf: string) {
        const message = `O cliente do CPF: ${cpf} já tem um aluguel em andamento.`
        super(message, StatusCodes.BAD_REQUEST, "BAD_REQUEST_ERROR")
        this.name = "RentalInProgressError"
    }
}
