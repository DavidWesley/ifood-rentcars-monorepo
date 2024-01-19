import { Router } from "express"

import { vehicleController } from "@/controllers/vehicleController.ts"

const vehicleRouter = Router({
    caseSensitive: true,
    strict: true,
})

vehicleRouter.get("/", vehicleController.listVehicles)
vehicleRouter.get("/available", vehicleController.listAvailableVehicles)
vehicleRouter.post("/", vehicleController.createVehicle)

// vehicleRouter.delete("/:plate", vehicleController.excludeVehicle) // Excluir um veículo pela sua placa

export { vehicleRouter }