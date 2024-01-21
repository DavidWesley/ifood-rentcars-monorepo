import { UUID } from "node:crypto"

import { LicenseType } from "@/models/license.ts"

export type VehicleType = "car" | "motorcycle"

export enum VehicleTypeEnum {
    CAR = "car",
    MOTORCYCLE = "motorcycle",
}

export interface Vehicle {
    id?: UUID
    plate: string
    type: VehicleType
    brand: string
    model: string
    manufacturingYear: number
    color: string
    mass: number
    license: LicenseType

    hourlyRentalRate: number
    available?: boolean
    popularity?: number
}
