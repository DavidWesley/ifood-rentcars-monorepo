import { Rental } from "@/models/rental.ts"
import { rentalRepository } from "@/repositories/rentalRepository.ts"

class ListRentalService {
    public async execute(): Promise<Required<Rental>[]> {
        const rentals: Rental[] = await rentalRepository.list()
        return rentals
    }
}

export const listRentalService = new ListRentalService()
