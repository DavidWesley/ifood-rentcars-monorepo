import { createClientService } from "@/services/CreateClientService.ts"
import { listClientService } from "@/services/ListClientService.ts"
import { NextFunction, Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

class ClientController {
    public async listClients(_: Request, res: Response, next: NextFunction) {
        try {
            const clients = await listClientService.execute()
            res.status(StatusCodes.OK).send(clients)
            next()
        } catch (err) {
            if (err instanceof Error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
                })
            }

            next()
        }
    }

    public async createClient(req: Request, res: Response, next: NextFunction) {
        try {
            const client = await createClientService.execute(req.body);
            res.status(StatusCodes.CREATED).send(client);

            next();

        } catch (err) {

            next();
        }
    }
}

export const clientController = new ClientController()