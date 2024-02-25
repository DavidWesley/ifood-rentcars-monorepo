import { StatusCodes } from "http-status-codes"

import { AppError, AppErrorProps } from "@/errors/AppError.ts"

export interface FieldValidationErrorProps {
    field: string
    message: string
}

export interface ValidationErrorProps extends AppErrorProps {
    fieldValidationErrors: FieldValidationErrorProps[]
}

export class ValidationError extends AppError {
    fieldValidationErrors: { field: string; message: string }[]

    constructor(message: string, fieldValidationErrors: FieldValidationErrorProps[]) {
        super(message, StatusCodes.BAD_REQUEST, "VALIDATION_ERROR")
        this.name = "ValidationError"
        this.fieldValidationErrors = fieldValidationErrors

        Object.setPrototypeOf(this, ValidationError.prototype)
    }
}

// Exemplo de uso
// const validationError = new ValidationError("Erro de validação", [
//     { field: "username", message: "O nome de usuário é obrigatório." },
//     { field: "email", message: "O formato do email é inválido." },
// ])
