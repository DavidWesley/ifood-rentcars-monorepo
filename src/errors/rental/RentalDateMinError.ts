import { BaseError } from "@/errors/BaseError.ts"
import { StatusCodes } from "http-status-codes"

export class RentalDateMinError extends BaseError {
    constructor(horas: number) {
        const message = `A data está incorreta, a diferença entre datas está menor que 24horas, está atualmente com: ${horas}horas`
        super(message, StatusCodes.NOT_FOUND, "NOT_FOUND_ERROR")
        this.name = "RentalNotFoundError"
    }
}
