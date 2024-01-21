import { RentalAlreadyInProgressError } from "@/errors/RentalAlreadyInProgress"
import { CustomerNotFoundError } from "@/errors/customer/CustomerNotFoundError.ts"
import { InvalidLicenseTypeError } from "@/errors/license/InvalidLicenseTypeError.ts"

import { RentalDateError } from "@/errors/rental/RentalDateError.ts"
import { RentalDateMinError } from "@/errors/rental/RentalDateMinError.ts"
import { VehicleNotFoundError } from "@/errors/vehicle/VehicleNotFoundError.ts"
import { VehicleUnavailableError } from "@/errors/vehicle/VehicleUnavailableError.ts"
import { Customer } from "@/models/customer.ts"
import { Rental, RentalStatus } from "@/models/rental.ts"
import { Vehicle } from "@/models/vehicle.ts"
import { customerRepository } from "@/repositories/customerRepository.ts"
import { invoiceRepository } from "@/repositories/invoiceRepository"
import { rentalRepository } from "@/repositories/rentalRepository.ts"
import { vehicleRepository } from "@/repositories/vehicleRepository.ts"
import { createInvoiceService } from "@/services/invoice/CreateInvoiceService.ts"
import { LicenseValidationService } from "@/services/license/LicenseValidationService.ts"

class CreateRentalService {
    public async execute(cpf: NonNullable<Customer["CPF"]>, plate: Vehicle["plate"], startDate: Date, endDate: Date): Promise<Required<Rental>> {
        const customer = await customerRepository.findByCPF(cpf)
        if (customer === null) {
            throw new CustomerNotFoundError(cpf)
        }

        const vehicle = await vehicleRepository.findByPlate(plate)
        if (vehicle === null) {
            throw new VehicleNotFoundError(plate)
        }

        if (vehicle.available === false) {
            throw new VehicleUnavailableError("Veículo indisponível.")
        }

        const existingRental = await rentalRepository.findInProgressByCustomerId(customer.id!);
        if (existingRental !== null) {
            throw new RentalAlreadyInProgressError(cpf);
        }


        if (LicenseValidationService.validateForVehicleType(customer.license, vehicle.type) === false) {
            throw new InvalidLicenseTypeError(`A CNH do usuário não é válida para alugar um veículo do tipo ${vehicle.type}.`)
        }

        if (endDate <= startDate){
            throw new RentalDateError(startDate,endDate);
        }

        const diff = Math.abs(endDate.getTime() - startDate.getTime()) / 3600000;

        if (diff < 24){
            throw new RentalDateMinError(diff);
        }

        vehicleRepository.updateOne(vehicle.id!, { available: false, popularity: vehicle.popularity + 1 })

        const rental = new Rental(customer.id!, vehicle.id!, startDate, endDate, RentalStatus.InProgress)
        await rentalRepository.create(rental)

        const invoice = await createInvoiceService.execute(rental.id, vehicle.hourlyRentalRate, rental.startDate, rental.endDate)

        await invoiceRepository.create(invoice)
        return rental
    }
}

export const createRentalService = new CreateRentalService()
