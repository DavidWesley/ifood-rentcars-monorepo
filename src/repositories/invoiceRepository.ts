import { Invoice } from "@/models/invoice.ts";

class InvoiceRepository {
    private invoices: Invoice[] = [];

    public async create(invoice: Invoice): Promise<void> {
        this.invoices.push(invoice);
    }

    public async findById(id: string): Promise<Invoice | null> {
        return this.invoices.find(invoice => invoice.id === id) || null;
    }

    public async findAllByCustomerId(customerId: string): Promise<Invoice[]> {
        return this.invoices.filter(invoice => invoice.customerId === customerId);
    }
}

export const invoiceRepository = new InvoiceRepository()
