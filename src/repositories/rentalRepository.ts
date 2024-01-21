import { Rental, RentalStatus } from "@/models/rental.ts";

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const today = new Date();
const nextMonth = new Date();
nextMonth.setMonth(nextMonth.getMonth() + 1);

class RentalRepository {
    protected static data: Required<Rental>[] = [
    {   
        createdAt: today,
        id: "d9a892f5-571d-4bd3-b44d-498441cce919",
        customerId: "d8a892f5-571d-4bd3-b44d-498441cce919",
        vehicleId: "d8a892f5-571d-4bd3-b44d-498441cce912",
        status: RentalStatus.Confirmed,
        startDate: nextMonth,
        endDate: nextMonth ,
        returnDate: null,
    },
    {   
        createdAt: today,
        id: "d7a892f5-571d-4bd3-b44d-498441cce919",
        customerId: "d8a892f5-571d-4bd3-b44d-498441cce917",
        vehicleId: "d8a892f5-571d-4bd3-b44d-498441cce911",
        status: RentalStatus.Completed,
        startDate: yesterday,
        endDate: today ,
        returnDate: today,
    },
    {   
        createdAt: today,
        id: "d6a892f5-571d-4bd3-b44d-498441cce919",
        customerId: "d8a892f5-571d-4bd3-b44d-498441cce916",
        vehicleId: "d8a892f5-571d-4bd3-b44d-498441cce913",
        status: RentalStatus.InProgress,
        startDate: today,
        endDate: nextMonth ,
        returnDate: null,
    }]

    public async list(): Promise<Required<Rental>[]> {
        return Array.from(RentalRepository.data)
    }

    public async findById(id: NonNullable<Rental["id"]>): Promise<Rental | null> {
        const rental = RentalRepository.data.find((rental) => rental.id === id)
        return rental ?? null
    }

    public async updateOne(rental: Rental){
        const {id} = rental;
        const rentalIndex = RentalRepository.data.findIndex((rental) => rental.id === id)
        if (rentalIndex === -1) return null

        RentalRepository.data[rentalIndex] = rental

        const newRental = RentalRepository.data[rentalIndex]!

        return newRental
    }
}

export const rentalRepository = new RentalRepository()