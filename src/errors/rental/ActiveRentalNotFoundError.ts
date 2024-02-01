import { StatusCodes } from "http-status-codes"

import { AppError } from "@/errors/AppError.ts"

export class ActiveRentalNotFoundError extends AppError {
    constructor(customerId: string) {
        const message = `Nenhum aluguel ativo encontrado para o usuário de id: ${customerId}`
        super(message, StatusCodes.NOT_FOUND, "NOT_FOUND_ERROR")
        this.name = "ActiveRentalNotFoundError"
    }
}
