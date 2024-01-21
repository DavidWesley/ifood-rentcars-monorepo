import { CustomerNotFoundError } from "@/errors/customer/CustomerNotFoundError.ts";
import { RentalMatchingError } from "@/errors/rental/RentalMatchingError.ts";
import { RentalNotFoundError } from "@/errors/rental/RentalNotFoundError.ts";
import { Customer } from "@/models/customer.ts";
import { Rental, RentalStatus } from "@/models/rental.ts";
import { customerRepository } from "@/repositories/customerRepository.ts";
import { rentalRepository } from "@/repositories/rentalRepository.ts";

class FinishRentalService{
    public async execute(customerId: NonNullable<Customer["id"]>, rentalId: NonNullable<Rental["id"]>){
        const customer = await customerRepository.findById(customerId);
        if (customer === null) {
            throw new CustomerNotFoundError(customerId);
        };

        const rental = await rentalRepository.findById(rentalId)
        if (rental === null) {
            throw new RentalNotFoundError(rentalId);
        };

        if (rental.customerId !== customerId){
         throw new RentalMatchingError(customerId, rentalId);
        };

        rental.endDate = new Date;
        rental.status = RentalStatus.Completed;

        rentalRepository.updateOne(rental);
        return rental
    }
}

export const finishRentalService = new FinishRentalService()