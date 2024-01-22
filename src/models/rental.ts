import { UUID, randomUUID } from "node:crypto"

import { Customer } from "@/models/customer.ts"
import { Vehicle } from "@/models/vehicle.ts"

export enum RentalStatus {
    InProgress = "inProgress",
    Completed = "completed",
    Canceled = "canceled",
}

export interface RentalProps {
    id?: UUID
    customerId: NonNullable<Customer["id"]>
    vehicleId: NonNullable<Vehicle["id"]>
    status: RentalStatus
    startDate: Date
    endDate: Date
    returnDate: Date | null
}

export class Rental implements RentalProps {
    public readonly customerId: NonNullable<Customer["id"]>
    public readonly vehicleId: NonNullable<Vehicle["id"]>

    public readonly startDate: Date
    public endDate: Date
    public returnDate: Date | null
    public status: RentalStatus

    public readonly id: UUID
    public readonly createdAt: Date

    constructor(
        customerId: NonNullable<Customer["id"]>,
        vehicleId: NonNullable<Vehicle["id"]>,
        startDate: Date,
        endDate: Date,
        status: RentalStatus
    ) {
        this.customerId = customerId
        this.vehicleId = vehicleId
        this.status = status

        this.startDate = startDate
        this.endDate = endDate
        this.returnDate = null

        this.id = randomUUID()
        this.createdAt = new Date()
    }
}
