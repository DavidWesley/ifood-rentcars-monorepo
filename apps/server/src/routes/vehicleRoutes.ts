import { Router } from "express"

import { vehicleController } from "@/controllers/vehicleController.ts"
import { createVehicleBodySchema } from "@/schemas/vehicleSchemas.ts"
import { ValidateRequestSchemaMiddleware } from "./middlewares/ValidateRequestSchemaMiddleware.ts"

const vehicleRouter = Router({
    caseSensitive: true,
    strict: true,
})

vehicleRouter.get("/", vehicleController.listVehicles)
vehicleRouter.post("/", ValidateRequestSchemaMiddleware.handle({ body: createVehicleBodySchema }), vehicleController.createVehicle)

vehicleRouter.get("/available", vehicleController.listAvailableVehicles)

export { vehicleRouter }
