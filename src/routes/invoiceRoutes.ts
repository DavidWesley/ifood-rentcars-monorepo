import { Router } from "express"

import { invoiceController } from "@/controllers/invoiceController.ts"
import { ValidateBodyFromSchemaMiddleware } from "@/middlewares/ValidateBodyFromSchemaMiddleware.ts"
import { ValidateQueryFromSchemaMiddleware } from "@/middlewares/ValidateQueryFromSchemaMiddleware.ts"
import { listCustomerInvoicesBodySchema, listInvoicesQuerySchema } from "@/schemas/invoiceSchemas.ts"

const invoiceRouter = Router({
    caseSensitive: true,
    strict: true,
})

invoiceRouter.post(
    "/list",
    ValidateBodyFromSchemaMiddleware.handle(listCustomerInvoicesBodySchema),
    ValidateQueryFromSchemaMiddleware.handle(listInvoicesQuerySchema),
    invoiceController.listCustomerInvoices
)

export { invoiceRouter }
