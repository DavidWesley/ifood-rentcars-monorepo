import { Vehicle } from "@/models/vehicle.ts"
import { vehicleRepository } from "@/repositories/vehicleRepository.ts"

class ListVehicleService {
    public async execute(): Promise<Vehicle[]> {
        const vehicles: Vehicle[] = await vehicleRepository.list()
        return vehicles
    }
}

export const listVehicleService = new ListVehicleService()
