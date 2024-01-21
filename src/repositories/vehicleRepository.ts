import { randomUUID } from "node:crypto"

import { Vehicle } from "@/models/vehicle.ts"

class VehicleRepository {
    protected static data: Required<Vehicle>[] = [
        {
            id: randomUUID(),
            plate: "PPQ-9798",
            license: "B",
            type: "car",
            hourlyRentalRate: 20,
            available: false,
            brand: "Audi",
            model: "A6",
            color: "white",
            manufacturingYear: 2024,
            mass: 1000,
            popularity: 0.1,
        },
        {
            id: randomUUID(),
            plate: "ABC-1234",
            license: "A",
            type: "motorcycle",
            hourlyRentalRate: 10,
            available: true,
            brand: "Honda",
            model: "CB300",
            color: "red",
            manufacturingYear: 2024,
            mass: 450,
            popularity: 0.2,
        },
    ]

    public async list(): Promise<Vehicle[]> {
        return Array.from(VehicleRepository.data)
    }

    public async add(props: Omit<Vehicle, "id">): Promise<Vehicle> {
        const id = randomUUID()
        const size = await VehicleRepository.data.push({ id, ...props, available: true, popularity: 0 })
        const vehicle = VehicleRepository.data[size - 1]!

        return vehicle
    }

    public async findByPlate(plate: string): Promise<Vehicle | null> {
        const vehicle = VehicleRepository.data.find((vehicle) => vehicle.plate === plate)

        return vehicle ?? null
    }

    public async updateOne(id: NonNullable<Vehicle["id"]>, props: Omit<Partial<Vehicle>, "id">): Promise<Required<Vehicle> | null> {
        const vehicleIndex = VehicleRepository.data.findIndex((vehicle) => vehicle.id === id)
        if (vehicleIndex === -1) return null

        VehicleRepository.data[vehicleIndex] = {
            ...VehicleRepository.data[vehicleIndex]!,
            ...props,
        }

        const vehicle = VehicleRepository.data[vehicleIndex]!

        return vehicle
    }
}

export const vehicleRepository = new VehicleRepository()
