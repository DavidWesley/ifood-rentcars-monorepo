import { Client } from "@/models/client.ts"
import { randomUUID } from "crypto"

class ClientRepository {
    protected static data: Client[] = [
        {
            id: randomUUID(),
            name: "Jurandir",
            CPF: "123123123",
            tipoCarteira: "A",
            alugando: null,
        },
        {
            id: randomUUID(),
            name: "Cacilda",
            CPF: "11111111111",
            tipoCarteira: "A",
            alugando: {
                plate: "PPQ-9798",
                license: "B",
                type: "car",
                hourlyRentalRate: 20,
                available: false,
                brand: "Audi",
                model: "A6",
                color: "white",
                manufacturingYear: 2024,
                mass: 1000,
                popularity: 0.1,
            },
        },
    ]

    public async list(): Promise<Client[]> {
        return Array.from(ClientRepository.data)
    }

    public async add(client: Client): Promise<Client> {
        client.id = randomUUID()
        ClientRepository.data.push(client)

        return client
    }
}

export const clientRepository = new ClientRepository()
