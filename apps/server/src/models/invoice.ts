import { UUID } from "node:crypto"

import { Rental } from "@/models/rental.ts"

export enum InvoiceStatus {
    Pending = "pending",
    Paid = "paid",
    Canceled = "canceled",
}

export interface Invoice {
    id?: UUID
    rentalId: NonNullable<Rental["id"]>
    status: InvoiceStatus
    totalCost?: number
}
