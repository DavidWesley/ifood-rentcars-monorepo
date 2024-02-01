export type ErrorCodeType =
    | "ALREADY_EXISTS"
    | "NOT_FOUND"
    | "VALIDATION"
    | "UNAVAILABLE"
    | "INVALID_TYPE"
    | "TIME_RANGE"
    | "LIMIT_EXCEEDED"
    | "INVALID_OPERATION"

export type ErrorCodeStringType = `${Uppercase<ErrorCodeType>}_ERROR`
