import { StatusCodes } from "http-status-codes"

import { AppError } from "@/errors/AppError.ts"

export class VehicleAlreadyExistsError extends AppError {
    constructor(plate: string) {
        const message = `Veículo com a placa ${plate} já existe.`
        super(message, StatusCodes.CONFLICT, "ALREADY_EXISTS_ERROR")
        this.name = "VehicleAlreadyExistsError"
    }
}
