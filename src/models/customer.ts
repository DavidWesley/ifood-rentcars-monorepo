import { UUID } from "crypto"

export interface Customer {
    id: UUID
    name: string
    CPF: string
    license: "A" | "B"
}
