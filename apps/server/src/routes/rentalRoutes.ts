import { Router } from "express"

import { rentalController } from "@/controllers/rentalController.ts"
import { createRentalBodySchema, finishRentalBodySchema } from "@/schemas/rentalSchemas.ts"
import { ValidateRequestSchemaMiddleware } from "./middlewares/ValidateRequestSchemaMiddleware.ts"

const rentalRouter = Router({
    caseSensitive: true,
    strict: true,
})

rentalRouter.get("/", rentalController.listRentals)
rentalRouter.post("/", ValidateRequestSchemaMiddleware.handle({ body: createRentalBodySchema }), rentalController.createRental)

rentalRouter.post("/finish", ValidateRequestSchemaMiddleware.handle({ body: finishRentalBodySchema }), rentalController.finishRental)

// TODO: Implementar rota de cancelamento de aluguel

export { rentalRouter }
