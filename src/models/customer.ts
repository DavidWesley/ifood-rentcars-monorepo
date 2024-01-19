import { UUID } from "node:crypto"

import { LicenseType } from "@/models/license.ts"

export interface Customer {
    id?: UUID
    name: string
    CPF: string
    license: LicenseType
}
