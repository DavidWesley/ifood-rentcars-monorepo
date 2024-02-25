import { UUID } from "node:crypto"

import { LicenseType } from "@/models/license.ts"

export type BaseCustomerGenderType = "male" | "female" | "other"

export interface Customer {
    id?: UUID
    name: string
    email: string
    cpf: string
    license: LicenseType
    birthDate: Date
    gender: BaseCustomerGenderType
}
