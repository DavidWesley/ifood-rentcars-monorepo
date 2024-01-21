import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"

import { ValidationError } from "@/errors/ValidationError.ts"
import { convertZodErrorIssuesToFieldsErrors } from "@/utils/convertZodErrorsToFieldsErrors.ts"

export class ValidateBodyFromSchemaMiddleware {
    public static handle(schema: ZodType, message?: string) {
        return async function (req: Request, res: Response, next: NextFunction) {
            const parsedBody = await schema.safeParseAsync(req.body)
            if (parsedBody.success === false) {
                const fieldValidationErrors = convertZodErrorIssuesToFieldsErrors(parsedBody.error)
                const error = new ValidationError(message || "Erro de validação", fieldValidationErrors)

                res.status(error.statusCode)

                console.log("[VALIDATION_BODY_SCHEMA_ERROR]:", error.errorCode)
                next(error)
            } else {
                req.body = parsedBody.data
                next()
            }
        }
    }
}
