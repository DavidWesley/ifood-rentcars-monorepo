import { StatusCodes } from "http-status-codes"

import { AppError } from "@/errors/AppError.ts"

export class VehicleUnavailableError extends AppError {
    constructor(message: string) {
        super(message, StatusCodes.EXPECTATION_FAILED, "UNAVAILABLE_ERROR")
        this.name = "VehicleUnavailableError"
    }
}
