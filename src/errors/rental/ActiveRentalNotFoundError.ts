import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"

export class ActiveRentalNotFoundError extends BaseError {
    constructor(customerId: string) {
        const message = `Nenhum aluguel ativo encontrado para o usuário de id: ${customerId}`
        super(message, StatusCodes.NOT_FOUND, "NOT_FOUND_ERROR")
        this.name = "ActiveRentalNotFoundError"
    }
}