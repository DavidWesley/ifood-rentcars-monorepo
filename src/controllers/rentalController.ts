import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { createRentalService } from "@/services/rental/CreateRentalService.ts"
import { finishRentalService } from "@/services/rental/FinishRentalService.ts"
import { listRentalService } from "@/services/rental/ListRentalService.ts"

class RentalController {
    public async listRentals(_: Request, res: Response, next: NextFunction) {
        try {
            const rentals = await listRentalService.execute()
            res.status(StatusCodes.OK).send(rentals)
            next()
        } catch (err) {
            next(err)
        }
    }

    public async finishRental(req: Request, res: Response, next: NextFunction){
        try {
            const {customerId, rentalId} = req.body;
            const newRental = await finishRentalService.execute(customerId, rentalId)
            res.status(StatusCodes.OK).send(newRental)
        } catch (err) {
                next(err)
            }
    }

    public async createRental(req: Request, res: Response, next: NextFunction) {
        try {
            const { customerId, plate, startDate, endDate } = req.body
            const rental = await createRentalService.execute(customerId, plate, startDate, endDate)
            res.status(StatusCodes.CREATED).send(rental)
            next()
        } catch (err) {
            next(err)
        }
    }
}

export const rentalController = new RentalController()
