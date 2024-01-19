import { UUID } from "crypto"

export type VehicleType = "car" | "motorcycle"

export interface Vehicle {
    id?: UUID
    plate: string
    type: VehicleType
    brand?: string
    model?: string
    manufacturingYear?: number
    color?: string
    mass?: number
    license: "A" | "B"

    hourlyRentalRate: number
    available?: boolean
    popularity?: number
}
