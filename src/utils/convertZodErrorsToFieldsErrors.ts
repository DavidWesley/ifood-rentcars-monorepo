import { ZodError } from "zod"

import { FieldValidationErrorProps } from "@/errors/ValidationError.ts"

// INFO: https://zod.dev/ERROR_HANDLING
export function convertZodErrorIssuesToFieldsErrors(error: ZodError): FieldValidationErrorProps[] {
    return error.issues.map((i) => ({ field: i.path.join(","), message: i.message }))
}
