import { db } from "@repo/drizzle"
import { vehicles as vehiclesTableSchema } from "@repo/drizzle/schema"
import { eq } from "drizzle-orm"

import { Vehicle } from "@/models/vehicle.ts"

class VehicleRepository {
    public async list(): Promise<Required<Vehicle>[]> {
        const vehicles = await db.query.vehicles.findMany()
        return vehicles
    }

    public async add(props: Omit<Vehicle, "id">): Promise<Required<Vehicle>> {
        const insertedVehicleIdsList = await db
            .insert(vehiclesTableSchema)
            .values({
                hourlyRentalRate: props.hourlyRentalRate,
                license: props.license,
                manufacturingYear: props.manufacturingYear,
                mass: props.mass,
                plate: props.plate,
                type: props.type,
                brand: props.brand ?? null,
                available: props.available ?? true,
                color: props.color,
                model: props.model,
                popularity: props.popularity ?? 0,
            })
            .returning({ id: vehiclesTableSchema.id })

        // TODO: mudar
        return (await this.findById(insertedVehicleIdsList[0]!.id)) as Required<Vehicle>
    }

    public async findByPlate(plate: string): Promise<Required<Vehicle> | null> {
        const vehicle = (await db.query.vehicles.findFirst({
            where: eq(vehiclesTableSchema.plate, plate),
        })) satisfies Required<Vehicle> | undefined

        return vehicle ?? null
    }

    public async findById(id: NonNullable<Vehicle["id"]>): Promise<Required<Vehicle> | null> {
        const vehicle = (await db.query.vehicles.findFirst({
            where: eq(vehiclesTableSchema.id, id),
        })) satisfies Required<Vehicle> | undefined

        return vehicle ?? null
    }

    public async updateOne(id: NonNullable<Vehicle["id"]>, props: Omit<Partial<Vehicle>, "id">): Promise<void> {
        const vehicleData = await db.query.vehicles.findFirst({
            where: eq(vehiclesTableSchema.id, id),
        })

        if (!vehicleData) return

        await db
            .update(vehiclesTableSchema)
            .set({ ...props })
            .where(eq(vehiclesTableSchema.id, vehicleData.id))
    }
}

export const vehicleRepository = new VehicleRepository()
