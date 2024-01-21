import { z } from "zod"

import { Customer } from "@/models/customer.ts"
import { validateCpf } from "@/utils/validators.ts"

export type SettableCustomerProperties = Omit<Customer, "id">

export type SettableCustomerPropertiesObjectType = {
    [key in keyof SettableCustomerProperties]: z.ZodType<SettableCustomerProperties[key]>
}

export const createCustomerBodySchema = z.object<SettableCustomerPropertiesObjectType>({
    name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caractere." }),
    email: z.string().email(),
    gender: z.enum(["male", "female", "other"]),
    license: z.enum(["A", "B"]),
    birthDate: z.coerce.date(),
    CPF: z
        .string()
        .transform((value) => value.replace(/\D/g, ""))
        .refine((value) => validateCpf(value) === true, { message: "CPF inválido." }),
})
