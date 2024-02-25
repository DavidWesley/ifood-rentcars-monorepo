import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { listCustomerInvoicesBodySchema, listInvoicesQuerySchema } from "@/schemas/invoiceSchemas.ts"
import { listCustomerInvoicesService } from "@/services/invoice/ListCustomerInvoicesService.ts"

class InvoiceController {
    public async listCustomerInvoices(req: Request, res: Response, next: NextFunction) {
        try {
            const query = listInvoicesQuerySchema.parse(req.query)
            const body = listCustomerInvoicesBodySchema.parse(req.body)
            const customerInvoices = await listCustomerInvoicesService.execute(body.cpf, query?.state)
            res.status(StatusCodes.OK).send(customerInvoices)
        } catch (err) {
            next(err)
        }
    }
}

export const invoiceController = new InvoiceController()
