import { validators } from "@utils-fns/validators"
import { UUID } from "node:crypto"

export const validateCpf = (cpf: string) => {
    return validators.cpf(cpf)
}

export type ValidatorFunction = (value: string) => boolean

export const Validators = Object.freeze({
    isUUID: (id: string): id is UUID => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id),
}) satisfies Readonly<Record<string, ValidatorFunction>>
