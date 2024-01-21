import { randomUUID } from "node:crypto"

import { Customer } from "@/models/customer.ts"

class CustomerRepository {
    protected static data: Required<Customer>[] = [
        {
            id: "d8a892f5-571d-4bd3-b44d-498441cce918",
            name: "João da Silva",
            email: "joao@example.com",
            CPF: "11111111111",
            birthDate: new Date(2001, 2, 4, 12, 30),
            license: "A",
            gender: "male",
        },
        // Create 3 dummy customers
        {
            id: "d8a892f5-571d-4bd3-b44d-498441cce919",
            name: "John Doe",
            email: "john.doe@example.com",
            CPF: "123.456.789-00",
            license: "A",
            birthDate: new Date("1990-01-01"),
            gender: "male",
        },
  
        {
            id: "d8a892f5-571d-4bd3-b44d-498441cce917",
            name: "Jane Doe",
            email: "jane.doe@example.com",
            CPF: "987.654.321-00",
            license: "B",
            birthDate: new Date("1995-05-15"),
            gender: "female",
        },
  
        {
            id: "d8a892f5-571d-4bd3-b44d-498441cce916",
            name: "Sam Smith",
            email: "sam.smith@example.com",
            CPF: "111.222.333-44",
            license: "AB",
            birthDate: new Date("1985-08-20"),
            gender: "other",
        }
    ]

    public async select(filter: Partial<Customer>): Promise<Customer[]> {
        const filterEntries = Object.entries(filter)
        if (filterEntries.length === 0) {
            return this.list()
        }

        return await CustomerRepository.data.filter((customer) => {
            return filterEntries.every(([key, value]) => Reflect.get(customer, key) === value)
        })
    }

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
