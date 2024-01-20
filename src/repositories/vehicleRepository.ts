import { randomUUID } from "node:crypto"

import { Vehicle } from "@/models/vehicle.ts"

class VehicleRepository {
    protected static data: Vehicle[] = [
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

    public async add(vehicle: Vehicle): Promise<Vehicle> {
        vehicle.id = randomUUID()
        VehicleRepository.data.push(vehicle)

        return vehicle
    }

    public async findByPlate(plate: string): Promise<Vehicle | null> {
        const vehicle = VehicleRepository.data.find((vehicle) => vehicle.plate === plate)

        return vehicle ?? null
    }
}

export const vehicleRepository = new VehicleRepository()
