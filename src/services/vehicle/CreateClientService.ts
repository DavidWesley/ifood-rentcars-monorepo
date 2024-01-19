import { Customer } from "@/models/customer.ts"
import { customerRepository } from "@/repositories/customerRepository.ts"

class CreateCustomerService {
    public async execute(props: Customer) {
        const customer: Customer = await customerRepository.add(props)
        return customer
    }
}

export const createCustomerService = new CreateCustomerService()
