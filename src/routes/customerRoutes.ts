import { Router } from "express"

import { customerController } from "@/controllers/customerController.ts"
import { ValidateBodyFromSchemaMiddleware } from "@/middlewares/ValidateBodyFromSchemaMiddleware.ts"
import { createCustomerBodySchema } from "@/schemas/customerSchema.ts"

const customerRouter = Router({
    caseSensitive: true,
    strict: true,
})

customerRouter.get("/", customerController.listCustomers)
customerRouter.post(
    "/",
    ValidateBodyFromSchemaMiddleware.handle(createCustomerBodySchema, "Erro na validação de criação de cliente"),
    customerController.createCustomer
)

export { customerRouter }
