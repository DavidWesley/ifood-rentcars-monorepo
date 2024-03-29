import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"

import { ValidationError } from "@/errors/ValidationError.ts"
import { convertZodErrorIssuesToFieldsErrors } from "@/utils/convertZodErrorsToFieldsErrors.ts"

export type RequestPropertiesNameType = "body" | "query" | "params"
type RequestRoutePropertiesSchemasObject = Partial<Record<RequestPropertiesNameType, ZodType>>

export class ValidateRequestSchemaMiddleware {
    private static isControlledPropertyName(name: string | symbol): name is RequestPropertiesNameType {
        const names: ReadonlyArray<RequestPropertiesNameType> = ["body", "params", "query"]
        return names.some((value) => value === name)
    }

    public static handle(schemas: RequestRoutePropertiesSchemasObject) {
        return async (request: Request, response: Response, next: NextFunction) => {
            for (const propertyName of Reflect.ownKeys(request)) {
                if (ValidateRequestSchemaMiddleware.isControlledPropertyName(propertyName)) {
                    const parsedObj = Reflect.has(schemas, propertyName)
                        ? await schemas[propertyName]?.safeParseAsync(request[propertyName])
                        : undefined

                    if (parsedObj === undefined) continue

                    if (parsedObj.success === false) {
                        const fieldValidationErrors = convertZodErrorIssuesToFieldsErrors(parsedObj.error)
                        const validationError = new ValidationError("Erro de validação", fieldValidationErrors)

                        response.status(validationError.statusCode)
                        next(validationError)
                    } else {
                        request[propertyName] = parsedObj.data
                    }
                }
            }
            next()
        }
    }
}
