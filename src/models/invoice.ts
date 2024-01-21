import { UUID } from "node:crypto";

export class Invoice {
    id: string;
    rentalId: string;
    totalCost: number;

    constructor(rentalId: string, totalCost: number) {
        this.id = UUID;
        this.rentalId = rentalId;
        this.totalCost = totalCost;
    }
}