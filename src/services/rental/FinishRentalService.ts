import { CustomerNotFoundError } from "@/errors/customer/CustomerNotFoundError.ts"
import { RentalAlreadyFinishedError } from "@/errors/rental/RentalAlreadyFinishedError.ts"
import { RentalDateRangeError } from "@/errors/rental/RentalDateRangeError.ts"
import { RentalNotFoundError } from "@/errors/rental/RentalNotFoundError.ts"
import { Customer } from "@/models/customer.ts"
import { Rental, RentalStatus } from "@/models/rental.ts"
import { customerRepository } from "@/repositories/customerRepository.ts"
import { invoiceRepository } from "@/repositories/invoiceRepository.ts"
import { rentalRepository } from "@/repositories/rentalRepository.ts"
import { vehicleRepository } from "@/repositories/vehicleRepository.ts"
import { payInvoiceService } from "@/services/invoice/PayInvoiceService.ts"

class FinishRentalService {
    public async execute(cpf: Customer["CPF"], date?: Date): Promise<Required<Rental>> {
        const customer = await customerRepository.findByCPF(cpf)
        if (customer === null) {
            throw new CustomerNotFoundError(cpf)
        }

        let rental = await rentalRepository.findLastFromCustomerId(customer.id)
        if (rental === null) {
            throw new RentalNotFoundError("")
        }

        if (rental.status === RentalStatus.Completed || rental.status === RentalStatus.Canceled) {
            throw new RentalAlreadyFinishedError("O último aluguel realizado pelo cliente já possui o status finalizado ou cancelado.")
        }

        const today = date ?? new Date()
        if (rental.startDate > today) {
            throw new RentalDateRangeError(rental.startDate, today)
        }

        rental = (await rentalRepository.updateOne(rental.id, { status: RentalStatus.Completed, returnDate: today }))!
        vehicleRepository.updateOne(rental.vehicleId!, { available: true })

        // TODO: No futuro, remover essa operação de pagamento de fatura dependente do aluguel
        await payInvoiceService.execute((await invoiceRepository.findByRentalId(rental.id))!.id)

        return rental
    }
}

export const finishRentalService = new FinishRentalService()
