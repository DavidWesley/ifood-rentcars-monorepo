import { Router } from "express"

import { clientController } from "@/controllers/clientController.ts"

const clientRouter = Router({
    caseSensitive: true,
    strict: true,
})

clientRouter.get("/", clientController.listClients)
clientRouter.post("/", clientController.createClient)

export { clientRouter }
