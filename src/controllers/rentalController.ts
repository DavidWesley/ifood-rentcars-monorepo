import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { createRentalBodySchema, finishRentalBodySchema } from "@/schemas/rentalSchemas.ts"
import { createRentalService } from "@/services/rental/CreateRentalService.ts"
import { finishRentalService } from "@/services/rental/FinishRentalService.ts"
import { listRentalService } from "@/services/rental/ListRentalService.ts"

class RentalController {
    public async listRentals(_: Request, res: Response, next: NextFunction) {
        try {
            const rentals = await listRentalService.execute()
            res.status(StatusCodes.OK).send(rentals)
        } catch (err) {
            next(err)
        }
    }

    public async finishRental(req: Request, res: Response, next: NextFunction) {
        try {
            const { cpf } = finishRentalBodySchema.parse(req.body)
            const finishedRental = await finishRentalService.execute(cpf)
            res.status(StatusCodes.OK).send(finishedRental)
        } catch (err) {
            next(err)
        }
    }

    public async createRental(req: Request, res: Response, next: NextFunction) {
        try {
            const { cpf, plate, startDate, endDate } = createRentalBodySchema.parse(req.body)
            const rental = await createRentalService.execute(cpf, plate, startDate, endDate)
            res.status(StatusCodes.CREATED).send(rental)
        } catch (err) {
            next(err)
        }
    }
}

export const rentalController = new RentalController()
