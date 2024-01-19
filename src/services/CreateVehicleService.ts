import { Vehicle } from "@/models/vehicle/vehicle.ts"
import { vehicleRepository } from "@/repositories/vehicleRepository.ts"

class CreateVehicleService {
    public async execute(props:Vehicle) {
        const vehicle: Vehicle = await vehicleRepository.add(props)
        return vehicle
    }
}

export const createVehicleService = new CreateVehicleService()
