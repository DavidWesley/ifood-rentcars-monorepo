import { randomUUID } from "node:crypto"
import { db } from "@repo/drizzle"

import { Customer } from "@/models/customer.ts"

class CustomerRepository {
    protected static data: Required<Customer>[] = []

    public async select(filter: Partial<Customer>): Promise<Required<Customer>[]> {
        const filterEntries = Object.entries(filter)
        if (filterEntries.length === 0) {
            return this.list()
        }

        return await CustomerRepository.data.filter((customer) => {
            return filterEntries.every(([key, value]) => Reflect.get(customer, key) === value)
        })
    }

    public async list(): Promise<Required<Customer>[]> {
        const customers = (await db.query.customers.findMany()) satisfies Required<Customer[]>
        return customers
    }

    public async add(props: Omit<Customer, "id">): Promise<Required<Customer>> {
        const size = await CustomerRepository.data.push({ id: randomUUID(), ...props })
        return CustomerRepository.data[size - 1] as Required<Customer>
    }

    public async findById(id: NonNullable<Customer["id"]>): Promise<Required<Customer> | null> {
        const customer = CustomerRepository.data.find((customer) => customer.id === id)
        return customer ?? null
    }

    public async findByCPF(CPF: Customer["cpf"]): Promise<Required<Customer> | null> {
        const customer = CustomerRepository.data.find((customer) => customer.cpf === CPF)
        return customer ?? null
    }

    public async findByEmail(email: Customer["email"]): Promise<Required<Customer> | null> {
        const customer = CustomerRepository.data.find((customer) => customer.email === email)
        return customer ?? null
    }
}

export const customerRepository = new CustomerRepository()
