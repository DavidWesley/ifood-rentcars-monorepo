import { randomUUID } from "node:crypto"

import { Customer } from "@/models/customer.ts"
import { Rental, RentalStatus } from "@/models/rental.ts"

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)

const today = new Date()
const nextMonth = new Date()
nextMonth.setMonth(nextMonth.getMonth() + 1)

class RentalRepository {
    protected static data: Required<Rental>[] = [
        {
            createdAt: today,
            id: "5601f30f-2455-4ea7-9461-2d0c08f97301",
            customerId: "d8a892f5-571d-4bd3-b44d-498441cce919",
            vehicleId: "01215db3-140e-4a68-b4ff-5c6881038232",
            status: RentalStatus.InProgress,
            startDate: nextMonth,
            endDate: nextMonth,
            returnDate: null,
        },
        {
            createdAt: today,
            id: "b3d9bb38-5565-451d-b77f-695bef771bd5",
            customerId: "cdab164a-fa1c-48f7-80f2-782c67d12547",
            vehicleId: "2f171600-a65d-4430-8fc8-955a61fc70fb",
            status: RentalStatus.Completed,
            startDate: yesterday,
            endDate: today,
            returnDate: today,
        },
        {
            createdAt: today,
            id: "b3d9bb38-5565-451d-b77f-695bef894bd5",
            customerId: "cdab164a-fa1c-48f7-80f2-782c67d12547",
            vehicleId: "2f171600-a65d-4430-8fc8-955a61fc70fb",
            status: RentalStatus.InProgress,
            startDate: yesterday,
            endDate: nextMonth,
            returnDate: today,
        },
        {
            createdAt: today,
            id: "bbad7843-b87s-4633-bb89-cb2710332a94",
            customerId: "d9a3af3e-1372-4d2e-8ab5-cb8602738195",
            vehicleId: "1f745b15-0a69-4df8-a120-64ab4a3de34c",
            status: RentalStatus.Canceled,
            startDate: today,
            endDate: nextMonth,
            returnDate: null,
        },
        {
            createdAt: today,
            id: "bbad7843-b61a-4633-bb89-cb2710332a94",
            customerId: "d9a3af3e-1372-4d2e-8ab5-cb8602738195",
            vehicleId: "1f745b15-0a69-4df8-a120-64ab4a3de34c",
            status: RentalStatus.InProgress,
            startDate: today,
            endDate: nextMonth,
            returnDate: null,
        },
    ]

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
            ...RentalRepository.data[rentalIndex]!,
            ...props,
        }

        const updatedRental = RentalRepository.data[rentalIndex]!

        return updatedRental
    }

    public async create(props: Omit<Rental, "id">): Promise<Required<Rental>> {
        const id = randomUUID()
        const size = await RentalRepository.data.push({ id, ...props })
        return RentalRepository.data[size - 1]!
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
