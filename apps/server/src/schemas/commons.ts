import { UUID } from "node:crypto"

import { z } from "zod"

import { Validators, validateCpf } from "@/libs/validators.ts"

export const uuidSchema = z.custom<UUID>().refine(Validators.isUUID)

export const vehiclePlateSchema = z.string().regex(/(^[A-Z]{3}-?\d{4}$)|(^[A-Z]{3}\d[A-Z]{1}\d{2}$)/, {
    message: "Formato de placa inválido. Use o formato ABC-1234, ABC1234 ou ABC1D23",
})

export const customerCPFSchema = z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => validateCpf(value) === true, { message: "CPF inválido." })
