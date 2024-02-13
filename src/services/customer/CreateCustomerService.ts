import { z } from "zod"

import { CustomerAlreadyExistsError } from "@/errors/customer/CustomerAlreadyExistsError.ts"
import { Customer } from "@/models/customer.ts"
import { customerRepository } from "@/repositories/customerRepository.ts"
import { createCustomerBodySchema } from "@/schemas/customerSchema.ts"

class CreateCustomerService {
    public async execute(props: z.output<typeof createCustomerBodySchema>): Promise<Required<Customer>> {
        const customerAlreadyExistsArray = await Promise.all([customerRepository.findByCPF(props.CPF), customerRepository.findByEmail(props.email)])

        if (customerAlreadyExistsArray.some((customer) => customer !== null)) {
            throw new CustomerAlreadyExistsError("CPF ou e-mail informado já existem no sistema.")
        }

        const customer = await customerRepository.add(props)
        return customer
    }
}

export const createCustomerService = new CreateCustomerService()
