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
            popularity: 1,
        },
        {
            id: "d8a892f5-571d-4bd3-b44d-498441cce912",
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
            popularity: 1,
        },
        {
            id: "d8a892f5-571d-4bd3-b44d-498441cce911",
            plate: "ABC-1234",
            license: "A",
            type: "motorcycle",
            hourlyRentalRate: 10,
            available: false,
            brand: "Honda",
            model: "CB300",
            color: "red",
            manufacturingYear: 2024,
            mass: 450,
            popularity: 2,
        },
        {
            id: "d8a892f5-571d-4bd3-b44d-498441cce913",
            plate: "ABC-1235",
            license: "B",
            type: "motorcycle",
            hourlyRentalRate: 20,
            available: false,
            brand: "Honda",
            model: "CB300",
            color: "red",
            manufacturingYear: 2024,
            mass: 450,
            popularity: 2,
        },
    ]

    public async list(): Promise<Required<Vehicle>[]> {
        return Array.from(VehicleRepository.data)
    }

    public async add(props: Omit<Vehicle, "id">): Promise<Required<Vehicle>> {
        const id = randomUUID()
        const size = await VehicleRepository.data.push({ id, ...props, available: true, popularity: 0 })
        const vehicle = VehicleRepository.data[size - 1]!

        return vehicle
    }

    public async findByPlate(plate: string): Promise<Required<Vehicle> | null> {
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
