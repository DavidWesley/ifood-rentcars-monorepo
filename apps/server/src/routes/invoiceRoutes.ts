import { Router } from "express"

import { invoiceController } from "@/controllers/invoiceController.ts"
import { listCustomerInvoicesBodySchema, listInvoicesQuerySchema } from "@/schemas/invoiceSchemas.ts"
import { ValidateRequestSchemaMiddleware } from "./middlewares/ValidateRequestSchemaMiddleware.ts"

const invoiceRouter = Router({
    caseSensitive: true,
    strict: true,
})

invoiceRouter.post(
    "/list",
    ValidateRequestSchemaMiddleware.handle({
        body: listCustomerInvoicesBodySchema,
        query: listInvoicesQuerySchema,
    }),
    invoiceController.listCustomerInvoices
)

export { invoiceRouter }
