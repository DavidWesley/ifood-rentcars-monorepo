import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"

import { ValidationError } from "@/errors/ValidationError.ts"
import { convertZodErrorIssuesToFieldsErrors } from "@/utils/convertZodErrorsToFieldsErrors.ts"

export class ValidateQueryFromSchemaMiddleware {
    public static handle(schema: ZodType, message?: string) {
        return async function (req: Request, res: Response, next: NextFunction) {
            const parsedQuery = await schema.safeParseAsync(req.query)
            if (parsedQuery.success === false) {
                const fieldValidationErrors = convertZodErrorIssuesToFieldsErrors(parsedQuery.error)
                const error = new ValidationError(message || "Erro de validação", fieldValidationErrors)

                res.status(error.statusCode)

                console.log("[VALIDATION_QUERY_SCHEMA_ERROR]:", error.errorCode)
                next(error)
            } else {
                req.query = parsedQuery.data
                next()
            }
        }
    }
}
