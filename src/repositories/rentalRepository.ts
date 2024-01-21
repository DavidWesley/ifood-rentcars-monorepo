import { Rental } from "@/models/rental.ts"

class RentalRepository {
    protected static data: Required<Rental>[] = []

    public async list(): Promise<Required<Rental>[]> {
        return Array.from(RentalRepository.data)
    }
}

export const rentalRepository = new RentalRepository()
