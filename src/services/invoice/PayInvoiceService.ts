import { InvoiceNotFoundError } from "@/errors/invoice/InvoiceNotFound.ts"
import { Invoice, InvoiceStatus } from "@/models/invoice.ts"
import { invoiceRepository } from "@/repositories/invoiceRepository.ts"
import { rentalRepository } from "@/repositories/rentalRepository.ts"
import { CalculateTotalAmount } from "@/services/invoice/CalculateTotalAmount.ts"

class PayInvoiceService {
    public async execute(invoiceId: NonNullable<Invoice["id"]>): Promise<Required<Invoice>> {
        let invoice = await invoiceRepository.findById(invoiceId)
        if (invoice === null) {
            throw new InvoiceNotFoundError(invoiceId)
        }

        const rental = await rentalRepository.findById(invoice.rentalId)
        const newAmount = await CalculateTotalAmount.calculate(rental!)
        invoice = await invoiceRepository.updateOne(invoiceId, { status: InvoiceStatus.Paid, totalCost: newAmount })

        return invoice!
    }
}

export const payInvoiceService = new PayInvoiceService()
