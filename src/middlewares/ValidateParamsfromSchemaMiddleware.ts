import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"

import { ValidationError } from "@/errors/ValidationError.ts"
import { convertZodErrorIssuesToFieldsErrors } from "@/utils/convertZodErrorsToFieldsErrors.ts"

export class ValidateParamsFromSchemaMiddleware {
    public static handle(schema: ZodType, message?: string) {
        return async function (req: Request, res: Response, next: NextFunction) {
            const parsedParams = await schema.safeParseAsync(req.params)
            if (parsedParams.success === false) {
                const fieldValidationErrors = convertZodErrorIssuesToFieldsErrors(parsedParams.error)
                const error = new ValidationError(message || "Erro de validação", fieldValidationErrors)

                res.status(error.statusCode)
                console.log("[PARAMS_SCHEMA_VALIDATION_ERROR]:", error.errorCode)
                next(error)
            } else {
                req.params = parsedParams.data
                next()
            }
        }
    }
}
