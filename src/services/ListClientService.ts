import { Client } from "@/models/client.ts"
import { clientRepository } from "@/repositories/clientRepository.ts"

class ListClientService {
    public async execute(): Promise<Client[]> {
        const clients: Client[] = await clientRepository.list()
        return clients
    }
}

export const listClientService = new ListClientService()
