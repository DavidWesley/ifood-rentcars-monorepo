import { Router } from "express"

import { customerController } from "@/controllers/customerController.ts"
import { createCustomerBodySchema } from "@/schemas/customerSchema.ts"
import { ValidateRequestSchemaMiddleware } from "./middlewares/ValidateRequestSchemaMiddleware.ts"

const customerRouter = Router({
    caseSensitive: true,
    strict: true,
})

customerRouter.get("/", customerController.listCustomers)
customerRouter.post("/", ValidateRequestSchemaMiddleware.handle({ body: createCustomerBodySchema }), customerController.createCustomer)

export { customerRouter }
