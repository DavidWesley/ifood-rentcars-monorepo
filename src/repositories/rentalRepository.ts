import { randomUUID } from "node:crypto"

import { Rental } from "@/models/rental.ts"

class RentalRepository {
    protected static data: Required<Rental>[] = []

    public async list(): Promise<Required<Rental>[]> {
        return Array.from(RentalRepository.data)
    }

    public async create(props: Omit<Rental, "id">): Promise<Required<Rental>> {
        // TODO: Melhorar registro de aluguel no banco
        const id = randomUUID()
        const size = await RentalRepository.data.push({ id, ...props })
        return RentalRepository.data[size - 1]!
    }
}

export const rentalRepository = new RentalRepository()
