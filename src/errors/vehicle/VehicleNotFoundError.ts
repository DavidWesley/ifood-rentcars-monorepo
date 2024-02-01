import { StatusCodes } from "http-status-codes"

import { AppError } from "@/errors/AppError.ts"

export class VehicleNotFoundError extends AppError {
    constructor(plate: string) {
        const message = `Veículo com a placa ${plate} não encontrado.`
        super(message, StatusCodes.NOT_FOUND, "NOT_FOUND_ERROR")
        this.name = "VehicleNotFoundError"
    }
}
