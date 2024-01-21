import { rentalController } from "@/controllers/rentalController.ts"
import { Router } from "express"

const rentalRouter = Router({
    caseSensitive: true,
    strict: true,
})

rentalRouter.get("/", rentalController.listRentals)

rentalRouter.post("/", rentalController.createRental)

export { rentalRouter }
