import { BaseError, BaseErrorProps } from "@/errors/BaseError.ts"

export interface FieldValidationErrorProps {
    field: string
    message: string
}

export interface ValidationErrorProps extends BaseErrorProps {
    fieldValidationErrors: FieldValidationErrorProps[]
}

export class ValidationError extends BaseError {
    fieldValidationErrors: { field: string; message: string }[]

    constructor(message: string, statusCode: number, errorCode: string, fieldValidationErrors: FieldValidationErrorProps[]) {
        super(message, statusCode, errorCode)
        this.name = "ValidationError"
        this.fieldValidationErrors = fieldValidationErrors

        Object.setPrototypeOf(this, ValidationError.prototype)
    }
}

// Exemplo de uso
// const validationError = new ValidationError("Erro de validação", StatusCode.BAD_REQUEST, "VALIDATION_ERROR", [
//     { field: "username", message: "O nome de usuário é obrigatório." },
//     { field: "email", message: "O formato do email é inválido." },
// ])
