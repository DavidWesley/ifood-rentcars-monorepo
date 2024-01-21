import { CustomerNotFoundError } from "@/errors/customer/CustomerNotFoundError.ts"
import { InvalidLicenseTypeError } from "@/errors/license/InvalidLicenseTypeError.ts"
import { VehicleNotFoundError } from "@/errors/vehicle/VehicleNotFoundError.ts"
import { VehicleUnavailableError } from "@/errors/vehicle/VehicleUnavailableError.ts"
import { Customer } from "@/models/customer.ts"
import { Rental, RentalStatus } from "@/models/rental.ts"
import { Vehicle } from "@/models/vehicle.ts"
import { customerRepository } from "@/repositories/customerRepository.ts"
import { rentalRepository } from "@/repositories/rentalRepository.ts"
import { vehicleRepository } from "@/repositories/vehicleRepository.ts"
import { LicenseValidationService } from "@/services/license/LicenseValidationService.ts"

class CreateRentalService {
    public async execute(customerId: NonNullable<Customer["id"]>, plate: Vehicle["plate"], startDate: Date, endDate: Date): Promise<Rental> {
        const customer = await customerRepository.findById(customerId)
        if (customer === null) {
            throw new CustomerNotFoundError(customerId)
        }

        const vehicle = await vehicleRepository.findByPlate(plate)
        if (vehicle === null) {
            throw new VehicleNotFoundError(plate)
        }

        if (vehicle.available === false) {
            throw new VehicleUnavailableError("Veículo indisponível.")
        }

        if (LicenseValidationService.validateForVehicleType(customer.license, vehicle.type) === false) {
            throw new InvalidLicenseTypeError(`A CNH do usuário não é válida para alugar um veículo do tipo ${vehicle.type}.`)
        }

        // TODO: Validar datas de início e fim do aluguel, incluindo a diferença mínima entre elas como sendo de 24h.

        vehicleRepository.updateOne(vehicle.id!, { available: false, popularity: vehicle.popularity + 1 })

        // TODO: Criação de aluguel
        const rental = new Rental(customer.id!, vehicle.id!, startDate, endDate, RentalStatus.InProgress)
        await rentalRepository.create(rental)

        // TODO: Criação de fatura
        // const invoice = createInvoiceService.execute(rental.id, vehicle.hourlyRentalRate, rental.startDate, rental.endDate)

        return rental
    }
}

export const createRentalService = new CreateRentalService()
