import { Router } from "express"

import { vehicleController } from "@/controllers/vehicleController.ts"

const vehicleRouter = Router({
    caseSensitive: true,
    strict: true,
})

vehicleRouter.get("/", vehicleController.listVehicles) // Listagem de veículos
vehicleRouter.post("/", vehicleController.createVehicle) // Cadastro de veículos

vehicleRouter.get("/available", vehicleController.listAvailableVehicles) // Listagem de veículos disponíveis pra alugar
// vehicleRouter.delete("/:plate", vehicleController.excludeVehicle) // Excluir um veículo pela sua placa

export { vehicleRouter }



//TODO:
//