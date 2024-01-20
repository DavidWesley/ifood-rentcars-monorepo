import { randomUUID } from "crypto"

import { Customer } from "@/models/customer.ts"

class CustomerRepository {
    protected static data: Customer[] = [
        {
            id: "d8a892f5-571d-4bd3-b44d-498441cce918",
            name: "João da Silva",
            email: "joao@example.com",
            CPF: "11111111111",
            birthDate: new Date(2001, 2, 4, 12, 30),
            license: "A",
            gender: "male",
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

    public async findById(id: NonNullable<Customer["id"]>): Promise<Customer | null> {
        const customer = CustomerRepository.data.find((customer) => customer.id === id)
        return customer ?? null
    }
}

export const customerRepository = new CustomerRepository()
