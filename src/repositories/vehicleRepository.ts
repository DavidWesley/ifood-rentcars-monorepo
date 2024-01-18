import { Vehicle } from "@/models/vehicle/vehicle.ts"
import { randomUUID } from "crypto"

class VehicleRepository {
    protected static data: Vehicle[] = [
        {
            id: randomUUID(),
            plate: "PPQ-9798",
            license: "B",
            type: "car",
            hourlyRentalRate: 20,
            available: true,
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
}

export const vehicleRepository = new VehicleRepository()
