import { listVehicleService } from "@/services/ListVehicleService.ts"
import { NextFunction, Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

class VehicleController {
    public async listVehicles(_: Request, res: Response, next: NextFunction) {
        try {
            const vehicles = await listVehicleService.execute()
            res.status(StatusCodes.OK).send(vehicles)
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
}

export const vehicleController = new VehicleController()
