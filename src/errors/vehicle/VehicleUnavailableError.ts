import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"

export class VehicleUnavailableError extends BaseError {
    constructor(message: string) {
        super(message, StatusCodes.EXPECTATION_FAILED, "VEHICLE_UNAVAILABLE_ERROR")
        this.name = "VehicleUnavailableError"
    }
}
