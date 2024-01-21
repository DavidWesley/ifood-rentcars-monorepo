import { CustomerNotFoundError } from "@/errors/customer/CustomerNotFoundError.ts"
import { ActiveRentalNotFoundError } from "@/errors/rental/ActiveRentalNotFoundError.ts"
import { RentalAlreadyFinishedError } from "@/errors/rental/RentalAlreadyFinishedError.ts"
import { RentalNotFoundError } from "@/errors/rental/RentalNotFoundError.ts"
import { Customer } from "@/models/customer.ts"
import { RentalStatus } from "@/models/rental.ts"
import { customerRepository } from "@/repositories/customerRepository.ts"
import { rentalRepository } from "@/repositories/rentalRepository.ts"
import { vehicleRepository } from "@/repositories/vehicleRepository.ts"

class FinishRentalService {
    public async execute(cpf: Customer["CPF"]) {
        const customer = await customerRepository.findByCPF(cpf)
        if (customer === null) {
            throw new CustomerNotFoundError(cpf)
        }

        let rental = await rentalRepository.findLastFromCustomerId(customer.id)
        if (rental === null) {
            throw new RentalNotFoundError("")
        }

        const {id : customerID} = customer;
        const activeRental = await rentalRepository.findActiveRentalByCustomerID(customerID!)
        if (rental === null) {
            throw new ActiveRentalNotFoundError(customerID!)
        }

        if (rental.status === RentalStatus.Completed || rental.status === RentalStatus.Canceled) {
            throw new RentalAlreadyFinishedError("O último aluguel realizado pelo cliente já possui o status finalizado ou cancelado.")
        }

        const today = new Date()
        rental = await rentalRepository.updateOne(rental.id, { status: RentalStatus.Completed, returnDate: today })

        vehicleRepository.updateOne(rental?.vehicleId!, { available: true })

        // TODO: CalculateTotalAmount Service and update invoice data
        // const invoice = calculateTotalAmountService.execute(rental)
        // invoiceRepository.updateOne(invoice)

        return rental
    }
}

export const finishRentalService = new FinishRentalService()
