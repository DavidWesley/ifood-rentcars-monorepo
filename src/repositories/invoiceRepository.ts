import { randomUUID } from "node:crypto"

import { Customer } from "@/models/customer.ts"
import { Invoice } from "@/models/invoice.ts"
import { Rental } from "@/models/rental.ts"
import { rentalRepository } from "@/repositories/rentalRepository.ts"

class InvoiceRepository {
    private static data: Required<Invoice>[] = []

    public async create(invoice: Omit<Required<Invoice>, "id">): Promise<Required<Invoice>> {
        const id = randomUUID()
        const size = InvoiceRepository.data.push({ id, ...invoice })
        return InvoiceRepository.data[size - 1]!
    }

    public async findById(id: string): Promise<Required<Invoice> | null> {
        return InvoiceRepository.data.find((invoice) => invoice.id === id) ?? null
    }

    public async updateOne(id: NonNullable<Invoice["id"]>, props: Omit<Partial<Invoice>, "id">): Promise<Required<Invoice> | null> {
        const invoiceIndex = InvoiceRepository.data.findIndex((invoice) => invoice.id === id)
        if (invoiceIndex === -1) return null

        InvoiceRepository.data[invoiceIndex] = {
            ...InvoiceRepository.data[invoiceIndex]!,
            ...props,
        }

        return InvoiceRepository.data[invoiceIndex]!
    }

    public async findByRentalId(rentalId: NonNullable<Rental["id"]>): Promise<Required<Invoice> | null> {
        const invoice = InvoiceRepository.data.find((invoice) => invoice.rentalId === rentalId)
        return invoice ?? null
    }

    public async findAllByCustomerId(customerId: NonNullable<Customer["id"]>): Promise<Required<Invoice>[]> {
        const rentals = await rentalRepository.findAllByCustomerId(customerId)
        const invoices: Required<Invoice>[] = []

        for await (const rental of rentals) {
            const invoice = await invoiceRepository.findByRentalId(rental.id)
            if (invoice !== null) {
                invoices.push(invoice)
            }
        }

        return invoices
    }
}

export const invoiceRepository = new InvoiceRepository()
