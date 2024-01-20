import { Router } from "express"

import { customerController } from "@/controllers/customerController.ts"

const customerRouter = Router({
    caseSensitive: true,
    strict: true,
})

customerRouter.get("/", customerController.listCustomers)
customerRouter.post("/", customerController.createCustomer)

export { customerRouter }
