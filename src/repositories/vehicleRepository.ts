import { randomUUID } from "node:crypto"

import { Vehicle } from "@/models/vehicle.ts"

class VehicleRepository {
    protected static data: Required<Vehicle>[] = [
        {
            id: "01215db3-140e-4a68-b4ff-5c6881038232",
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
            id: "2f171600-a65d-4430-8fc8-955a61fc70fb",
            plate: "PPQ-9799",
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
            id: "1f745b15-0a69-4df8-a120-64ab4a3de34c",
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
            id: "30a86e15-39f8-4e2e-b5ef-b36eaa5d0fc8",
            plate: "ABC-1235",
            license: "A",
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

    public async findById(id: NonNullable<Vehicle["id"]>): Promise<Required<Vehicle> | null> {
        const vehicle = VehicleRepository.data.find((vehicle) => vehicle.id === id)
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
