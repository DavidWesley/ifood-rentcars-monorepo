import { db } from "@repo/drizzle"
import { rentals as rentalTableSchema } from "@repo/drizzle/schema"
import { and, desc, eq } from "drizzle-orm"

import { Customer } from "@/models/customer.ts"
import { Rental, RentalStatus } from "@/models/rental.ts"

class RentalRepository {
    protected static data: Required<Rental>[] = []
    protected static convert(rental: typeof rentalTableSchema.$inferSelect) {
        const data = {
            id: rental.id,
            customerId: rental.customerId,
            vehicleId: rental.vehicleId,
            endDate: rental.endDate,
            startDate: rental.startDate,
            returnDate: rental.returnDate,
            status: rental.status as RentalStatus,
            createdAt: rental.createdAt,
        } satisfies Required<Rental>

        return data
    }

    public async list(): Promise<Required<Rental>[]> {
        const rentals = await db.query.rentals.findMany()
        return rentals.map(RentalRepository.convert)
    }

    public async findById(id: NonNullable<Rental["id"]>): Promise<Required<Rental> | null> {
        const rental = await db.query.rentals.findFirst({
            where: eq(rentalTableSchema.id, id),
        })

        return rental ? RentalRepository.convert(rental) : null
    }

    public async findAllByCustomerId(customerId: NonNullable<Rental["customerId"]>): Promise<Required<Rental>[]> {
        const rentals = await db.query.rentals.findMany({
            where: eq(rentalTableSchema.id, customerId),
        })

        return rentals.map(RentalRepository.convert)
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
        const insertedRentalIdsList = await db
            .insert(rentalTableSchema)
            .values({
                ...props,
                status: props.status as `${RentalStatus}`,
            })
            .returning({ id: rentalTableSchema.id })

        return (await this.findById(insertedRentalIdsList[0]!.id))!
    }

    public async findLastFromCustomerId(customerId: NonNullable<Customer["id"]>): Promise<Required<Rental> | null> {
        // const [rental] = await db
        //     .select()
        //     .from(rentalTableSchema)
        //     .where(eq(rentalTableSchema.customerId, customerId))
        //     .orderBy(desc(rentalTableSchema.createdAt))
        //     .limit(1)

        const rental = await db.query.rentals.findFirst({
            where: and(eq(rentalTableSchema.customerId, customerId)),
            orderBy: [desc(rentalTableSchema.createdAt)],
        })

        return rental ? RentalRepository.convert(rental) : null
    }

    public async findInProgressByCustomerId(customerId: NonNullable<Rental["customerId"]>): Promise<Required<Rental> | null> {
        // const [rental] = await db
        //     .select()
        //     .from(rentalTableSchema)
        //     .where(and(eq(rentalTableSchema.customerId, customerId), eq(rentalTableSchema.status, RentalStatus.InProgress)))
        //     .orderBy(desc(rentalTableSchema.createdAt))
        //     .limit(1)

        const rental = await db.query.rentals.findFirst({
            where: and(eq(rentalTableSchema.customerId, customerId), eq(rentalTableSchema.status, RentalStatus.InProgress)),
            orderBy: [desc(rentalTableSchema.createdAt)],
        })

        return rental ? RentalRepository.convert(rental) : null
    }
}

export const rentalRepository = new RentalRepository()
