import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"

export class VehicleNotFoundError extends BaseError {
    constructor(plate: string) {
        const message = `Veículo com a placa ${plate} não encontrado.`
        super(message, StatusCodes.NOT_FOUND, "NOT_FOUND_ERROR")
        this.name = "VehicleNotFoundError"
    }
}
