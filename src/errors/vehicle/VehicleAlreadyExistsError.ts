import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"

export class VehicleAlreadyExistsError extends BaseError {
    constructor(plate: string) {
        const message = `Veículo com a placa ${plate} já existe.`
        super(message, StatusCodes.CONFLICT, "VEHICLE_ALREADY_EXISTS_ERROR")
        this.name = "VehicleAlreadyExistsError"
    }
}
