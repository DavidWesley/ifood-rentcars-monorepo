import { z } from "zod"

import { Customer } from "@/models/customer.ts"
import { customerRepository } from "@/repositories/customerRepository.ts"
import { createCustomerBodySchema } from "@/schemas/customerSchema.ts"

class CreateCustomerService {
    public async execute(props: z.output<typeof createCustomerBodySchema>): Promise<Customer> {
        const customer: Customer = await customerRepository.add(props)
        return customer
    }
}

export const createCustomerService = new CreateCustomerService()
