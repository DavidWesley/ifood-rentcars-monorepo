import { CustomerNotFoundError } from "@/errors/customer/CustomerNotFoundError.ts"
import { Customer } from "@/models/customer.ts"
import { Invoice } from "@/models/invoice.ts"
import { customerRepository } from "@/repositories/customerRepository.ts"
import { invoiceRepository } from "@/repositories/invoiceRepository.ts"

class ListCustomerInvoicesService {
    public async execute(cpf: Customer["CPF"], state?: Invoice["status"]): Promise<Required<Invoice>[]> {
        const customer = await customerRepository.findByCPF(cpf)
        if (customer === null) {
            throw new CustomerNotFoundError(cpf)
        }

        const invoices = await invoiceRepository.findAllByCustomerId(customer.id)
        return state ? invoices.filter((invoice) => invoice.status === state) : invoices
    }
}

export const listCustomerInvoicesService = new ListCustomerInvoicesService()
