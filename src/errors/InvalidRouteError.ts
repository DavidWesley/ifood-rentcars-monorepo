import { StatusCodes } from "http-status-codes"

import { AppError } from "@/errors/AppError.ts"

export class InvalidRouteError extends AppError {
    constructor(message: string) {
        super(message, StatusCodes.NOT_FOUND, "NOT_FOUND_ERROR")
        this.name = "InvalidRouteError"
    }
}
