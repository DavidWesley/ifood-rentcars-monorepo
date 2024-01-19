import { Router } from "express"

import { vehicleController } from "@/controllers/vehicleController.ts"

const vehicleRouter = Router({
    caseSensitive: true,
    strict: true,
})

vehicleRouter.get("/", vehicleController.listVehicles)
vehicleRouter.get("/available", vehicleController.listAvailableVehicles)
vehicleRouter.post("/", vehicleController.createVehicle)

export { vehicleRouter }
