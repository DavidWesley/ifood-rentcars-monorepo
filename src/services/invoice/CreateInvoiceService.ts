import { Invoice } from "@/models/invoice.ts"
import { Rental } from "@/models/rental.ts"
import { invoiceRepository } from "@/repositories/invoiceRepository.ts"
import { rentalRepository } from "@/repositories/rentalRepository.ts"

class CreateInvoiceService {
    public async execute(rentalId: Rental["id"], hourlyRate: number, startDate: Date, endDate: Date): Promise<Required<Invoice>> {
        const rental = await rentalRepository.findById(rentalId)
        if (rental === null) {
            throw new Error("Aluguel não encontrado.")
        }

        const diffHours = Math.abs(endDate.getTime() - startDate.getTime()) / 3600000;
        const totalCost = diffHours * hourlyRate;

        const invoice = new Invoice(rental.id!, totalCost)
        await invoiceRepository.create(invoice)

        return invoice
    }
}

export const createInvoiceService = new CreateInvoiceService()
