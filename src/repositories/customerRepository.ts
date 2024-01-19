import { randomUUID } from "crypto"

import { Customer } from "@/models/customer.ts"

class CustomerRepository {
    protected static data: Customer[] = [
        {
            id: randomUUID(),
            name: "Jurandir",
            CPF: "123123123",
            license: "A",
        },
        {
            id: randomUUID(),
            name: "Cacilda",
            CPF: "11111111111",
            license: "A",
        },
    ]

    public async list(): Promise<Customer[]> {
        return Array.from(CustomerRepository.data)
    }

    public async add(customer: Customer): Promise<Customer> {
        customer.id = randomUUID()
        CustomerRepository.data.push(customer)

        return customer
    }
}

export const customerRepository = new CustomerRepository()
