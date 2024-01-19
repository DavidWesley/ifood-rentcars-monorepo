import { UUID } from "crypto"
import { Vehicle } from "./vehicle.ts"

export interface Client {
    id: UUID
    name: string
    CPF: string
    tipoCarteira: "A" | "B"
    alugando: Vehicle | null
}
