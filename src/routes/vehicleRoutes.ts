import { Router } from "express"

import { vehicleController } from "@/controllers/vehicleController.ts"
import { ValidateBodyFromSchemaMiddleware } from "@/middlewares/ValidateBodyFromSchemaMiddleware.ts"
import { createVehicleBodySchema } from "@/schemas/vehicleSchemas.ts"

const vehicleRouter = Router({
    caseSensitive: true,
    strict: true,
})

vehicleRouter.get("/", vehicleController.listVehicles)
vehicleRouter.get("/available", vehicleController.listAvailableVehicles)
vehicleRouter.post(
    "/",
    ValidateBodyFromSchemaMiddleware.handle(createVehicleBodySchema, "Erro de validação na criação do veículo"),
    vehicleController.createVehicle
)

export { vehicleRouter }
