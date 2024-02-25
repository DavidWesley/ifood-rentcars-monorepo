import { StatusCodes } from "http-status-codes"

import { AppError } from "@/errors/AppError.ts"

export class InvalidLicenseTypeError extends AppError {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST, "INVALID_TYPE_ERROR")
        this.name = "InvalidLicenseTypeError"
    }
}
