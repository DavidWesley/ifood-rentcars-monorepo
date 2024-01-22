import { RentalNotFoundError } from "@/errors/rental/RentalNotFoundError.ts"
import { Invoice, InvoiceStatus } from "@/models/invoice.ts"
import { Rental } from "@/models/rental.ts"
import { invoiceRepository } from "@/repositories/invoiceRepository.ts"
import { rentalRepository } from "@/repositories/rentalRepository.ts"
import { CalculateTotalAmount } from "@/services/invoice/CalculateTotalAmount.ts"

class CreateInvoiceService {
    public async execute(rentalId: NonNullable<Rental["id"]>): Promise<Required<Invoice>> {
        const rental = await rentalRepository.findById(rentalId)
        if (rental === null) {
            throw new RentalNotFoundError(rentalId)
        }

        const totalAmount = await CalculateTotalAmount.calculate(rental)

        return await invoiceRepository.create({
            rentalId: rental.id,
            status: InvoiceStatus.Pending,
            totalCost: totalAmount,
        })
    }
}

export const createInvoiceService = new CreateInvoiceService()
