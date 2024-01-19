import { Client } from "@/models/client.ts"
import { clientRepository } from "@/repositories/clientRepository.ts"

class CreateClientService {
    public async execute(props: Client) {
        const client: Client = await clientRepository.add(props)
        return client
    }
}

export const createClientService = new CreateClientService()
