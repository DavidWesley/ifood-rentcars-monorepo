import { randomUUID } from "node:crypto"

import { Invoice } from "@/models/invoice.ts"

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
}

export const invoiceRepository = new InvoiceRepository()
