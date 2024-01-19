import { NextFunction, Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

import { createCustomerService } from "@/services/customer/CreateCustomerService.ts"
import { listCustomerService } from "@/services/customer/ListCustomerService.ts"

class CustomerController {
    public async listCustomers(_: Request, res: Response, next: NextFunction) {
        try {
            const customers = await listCustomerService.execute()
            res.status(StatusCodes.OK).send(customers)
            next()
        } catch (err) {
            if (err instanceof Error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
                })
            }

            next()
        }
    }

    public async createCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const customer = await createCustomerService.execute(req.body)
            res.status(StatusCodes.CREATED).send(customer)

            next()
        } catch (err) {
            next()
        }
    }
}

export const customerController = new CustomerController()
