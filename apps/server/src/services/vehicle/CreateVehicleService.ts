import { randomUUID } from "node:crypto"

import { z } from "zod"

import { VehicleAlreadyExistsError } from "@/errors/vehicle/VehicleAlreadyExistsError.ts"
import { getLicenseTypeFromVehicleType } from "@/models/license.ts"
import { Vehicle } from "@/models/vehicle.ts"
import { vehicleRepository } from "@/repositories/vehicleRepository.ts"
import { createVehicleBodySchema } from "@/schemas/vehicleSchemas.ts"

class CreateVehicleService {
    public async execute(props: z.output<typeof createVehicleBodySchema>): Promise<Vehicle> {
        const normalizedPlate = props.plate.replace("-", "").toUpperCase()
        const vehicleAlreadyExists = await vehicleRepository.findByPlate(normalizedPlate)
        if (vehicleAlreadyExists !== null) {
            throw new VehicleAlreadyExistsError(vehicleAlreadyExists.plate)
        }

        const vehicle: Vehicle = {
            id: randomUUID(),
            plate: normalizedPlate,
            type: props.type,
            hourlyRentalRate: props.hourlyRentalRate,
            brand: props.brand,
            model: props.model,
            manufacturingYear: props.manufacturingYear,
            color: props.color,
            mass: props.mass,
            available: true,
            popularity: 0,
            license: getLicenseTypeFromVehicleType(props.type, props.mass),
        }

        return await vehicleRepository.add(vehicle)
    }
}

export const createVehicleService = new CreateVehicleService()
