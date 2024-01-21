import { CustomerNotFoundError } from "@/errors/customer/CustomerNotFoundError.ts"
import { RentalNotFoundError } from "@/errors/rental/RentalNotFoundError.ts"
import { Customer } from "@/models/customer.ts"
import { RentalStatus } from "@/models/rental.ts"
import { customerRepository } from "@/repositories/customerRepository.ts"
import { rentalRepository } from "@/repositories/rentalRepository.ts"

class FinishRentalService {
    public async execute(customerCPF: NonNullable<Customer["CPF"]>) {
        const customer = await customerRepository.findByCPF(customerCPF)
        if (customer === null) {
            throw new CustomerNotFoundError(customerCPF)
        }
        const {id : customerID} = customer;
        const rental = await rentalRepository.findBycustomerID(customerID!)
        if (rental === null) {
            throw new RentalNotFoundError(customerID!)
        }

        rental.endDate = new Date()
        rental.status = RentalStatus.Completed

        rentalRepository.updateOne(rental)
        return rental
    }
}

export const finishRentalService = new FinishRentalService()
