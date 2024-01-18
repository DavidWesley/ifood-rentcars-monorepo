import { vehicleRepository } from "@/repositories/vehicleRepository.ts"

class ListVehicleService {
    public async execute() {
        const vehicles: any[] = await vehicleRepository.list()
        return vehicles
    }
}

export const listVehicleService = new ListVehicleService()
