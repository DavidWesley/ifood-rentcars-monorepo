import { validators } from "@utils-fns/validators"

export const validateCpf = (cpf: string) => {
    return validators.cpf(cpf)
}
