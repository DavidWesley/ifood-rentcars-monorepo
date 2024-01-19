import { Customer } from "@/models/customer.ts"
import { customerRepository } from "@/repositories/customerRepository.ts"

class ListCustomerService {
    public async execute(): Promise<Customer[]> {
        const customers: Customer[] = await customerRepository.list()
        return customers
    }
}

export const listCustomerService = new ListCustomerService()
