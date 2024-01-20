import { StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"

export class InvalidLicenseTypeError extends BaseError {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST, "INVALID_LICENSE_TYPE_ERROR")
        this.name = "InvalidLicenseTypeError"
    }
}
