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

    public async add(props: Omit<Customer, "id">): Promise<Customer> {
        const size = await CustomerRepository.data.push({ id: randomUUID(), ...props })
        return CustomerRepository.data[size - 1]!
    }

    public async findById(id: NonNullable<Customer["id"]>): Promise<Customer | null> {
        const customer = CustomerRepository.data.find((customer) => customer.id === id)
        return customer ?? null
    }

    public async findByCPF(CPF: Customer["CPF"]): Promise<Customer | null> {
        const customer = CustomerRepository.data.find((customer) => customer.CPF === CPF)
        return customer ?? null
    }

    public async findByEmail(email: Customer["email"]): Promise<Customer | null> {
        const customer = CustomerRepository.data.find((customer) => customer.email === email)
        return customer ?? null
    }
}

export const customerRepository = new CustomerRepository()
