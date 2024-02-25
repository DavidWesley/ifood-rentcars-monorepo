import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { createCustomerService } from "@/services/customer/CreateCustomerService.ts"
import { listCustomerService } from "@/services/customer/ListCustomerService.ts"

class CustomerController {
    public async listCustomers(_: Request, res: Response, next: NextFunction) {
        try {
            const customers = await listCustomerService.execute()
            res.status(StatusCodes.OK).send(customers)
        } catch (err) {
            next(err)
        }
    }

    public async createCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const customer = await createCustomerService.execute(req.body)
            res.status(StatusCodes.CREATED).send(customer)
        } catch (err) {
            next(err)
        }
    }
}

export const customerController = new CustomerController()
