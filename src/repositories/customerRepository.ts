import { randomUUID } from "node:crypto"

import { Customer } from "@/models/customer.ts"

class CustomerRepository {
    protected static data: Required<Customer>[] = [
        {
            id: "d8a892f5-571d-4bd3-b44d-498441cce918",
            name: "João da Silva",
            email: "joao@example.com",
            CPF: "12442272008",
            birthDate: new Date("2001-02-04"),
            license: "A",
            gender: "male",
        },
        {
            id: "cdab164a-fa1c-48f7-80f2-782c67d12547",
            name: "John Doe",
            email: "john.doe@example.com",
            CPF: "61305705033",
            license: "A",
            birthDate: new Date("1990-01-01"),
            gender: "male",
        },
        {
            id: "d9a3af3e-1372-4d2e-8ab5-cb8602738195",
            name: "Jane Doe",
            email: "jane.doe@example.com",
            CPF: "26171836028",
            license: "B",
            birthDate: new Date("1995-05-15"),
            gender: "female",
        },
        {
            id: "7222abd5-ba68-437d-a706-5aa4a7352dc1",
            name: "Sam Smith",
            email: "sam.smith@example.com",
            CPF: "89291776033",
            license: "AB",
            birthDate: new Date("1985-08-20"),
            gender: "other",
        },
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

    public async add(props: Omit<Customer, "id">): Promise<Required<Customer>> {
        const size = await CustomerRepository.data.push({ id: randomUUID(), ...props })
        return CustomerRepository.data[size - 1]!
    }

    public async findById(id: NonNullable<Customer["id"]>): Promise<Required<Customer> | null> {
        const customer = CustomerRepository.data.find((customer) => customer.id === id)
        return customer ?? null
    }

    public async findByCPF(CPF: Customer["CPF"]): Promise<Required<Customer> | null> {
        const customer = CustomerRepository.data.find((customer) => customer.CPF === CPF)
        return customer ?? null
    }

    public async findByEmail(email: Customer["email"]): Promise<Required<Customer> | null> {
        const customer = CustomerRepository.data.find((customer) => customer.email === email)
        return customer ?? null
    }
}

export const customerRepository = new CustomerRepository()
