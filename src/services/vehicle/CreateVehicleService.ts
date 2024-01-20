import { randomUUID } from "node:crypto"

import { ValidationError } from "@/errors/ValidationError.ts"
import { VehicleAlreadyExistsError } from "@/errors/vehicle/VehicleAlreadyExistsError.ts"
import { getLicenseTypeFromVehicleType } from "@/models/license.ts"
import { Vehicle } from "@/models/vehicle.ts"
import { vehicleRepository } from "@/repositories/vehicleRepository.ts"
import { createVehicleBodySchema } from "@/schemas/vehicleSchemas.ts"
import { convertZodErrorIssuesToFieldsErrors } from "@/utils/convertZodErrorsToFieldsErrors.ts"

interface CreateVehicleProps extends Omit<Vehicle, "id" | "available" | "popularity" | "license"> {}

class CreateVehicleService {
    public async execute(props: CreateVehicleProps): Promise<Vehicle> {
        const parsedProps = createVehicleBodySchema.safeParse(props)

        if (parsedProps.success === false) {
            const fieldValidationErrors = convertZodErrorIssuesToFieldsErrors(parsedProps.error)
            throw new ValidationError("Erro de validação na criação do veículo", fieldValidationErrors)
        }

        const normalizedPlate = parsedProps.data.plate.replace("-", "").toUpperCase()
        const vehicleAlreadyExists = await vehicleRepository.findByPlate(normalizedPlate)
        if (vehicleAlreadyExists !== null) {
            throw new VehicleAlreadyExistsError(vehicleAlreadyExists.plate)
        }

        const vehicle: Vehicle = {
            id: randomUUID(),
            plate: normalizedPlate,
            type: parsedProps.data.type,
            hourlyRentalRate: parsedProps.data.hourlyRate,
            brand: parsedProps.data.brand,
            model: parsedProps.data.model,
            manufacturingYear: parsedProps.data.manufacturingYear,
            color: parsedProps.data.color,
            mass: parsedProps.data.mass,
            available: true,
            popularity: 0,
            license: getLicenseTypeFromVehicleType(parsedProps.data.type, parsedProps.data.mass),
        }

        return await vehicleRepository.add(vehicle)
    }
}

export const createVehicleService = new CreateVehicleService()
