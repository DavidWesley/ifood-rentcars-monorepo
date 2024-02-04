import { randomUUID } from "node:crypto"

import { Customer } from "@/models/customer.ts"
import { Rental, RentalStatus } from "@/models/rental.ts"

class RentalRepository {
    protected static data: Required<Rental>[] = []

    public async list(): Promise<Required<Rental>[]> {
        return Array.from(RentalRepository.data)
    }

    public async findById(id: NonNullable<Rental["id"]>): Promise<Required<Rental> | null> {
        const rental = RentalRepository.data.find((rental) => rental.id === id)
        return rental ?? null
    }

    public async findAllByCustomerId(customerId: NonNullable<Rental["customerId"]>): Promise<Required<Rental>[]> {
        const rentals = RentalRepository.data.filter((rental) => rental.customerId === customerId)
        return rentals
    }

    public async updateOne(id: NonNullable<Rental["id"]>, props: Omit<Partial<Rental>, "id">): Promise<Required<Rental> | null> {
        const rentalIndex = RentalRepository.data.findIndex((rental) => rental.id === id)
        if (rentalIndex === -1) return null

        RentalRepository.data[rentalIndex] = {
            ...(RentalRepository.data[rentalIndex] as Required<Rental>),
            ...props,
        }

        const updatedRental = RentalRepository.data[rentalIndex] as Required<Rental>

        return updatedRental
    }

    public async create(props: Omit<Rental, "id">): Promise<Required<Rental>> {
        const id = randomUUID()
        const size = await RentalRepository.data.push({ id, ...props })
        return RentalRepository.data[size - 1] as Required<Rental>
    }

    public async findLastFromCustomerId(customerId: NonNullable<Customer["id"]>): Promise<Required<Rental> | null> {
        const rental = RentalRepository.data.findLast((rental) => rental.customerId === customerId)
        return rental ?? null
    }

    public async findInProgressByCustomerId(customerId: NonNullable<Rental["customerId"]>): Promise<Required<Rental> | null> {
        const rental = RentalRepository.data.find((rental) => rental.customerId === customerId && rental.status === RentalStatus.InProgress)
        return rental ?? null
    }
}

export const rentalRepository = new RentalRepository()
