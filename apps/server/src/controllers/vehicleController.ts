import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { createVehicleService } from "@/services/vehicle/CreateVehicleService.ts"
import { listVehicleService } from "@/services/vehicle/ListVehicleService.ts"

class VehicleController {
    public async listVehicles(_: Request, res: Response, next: NextFunction) {
        try {
            const vehicles = await listVehicleService.execute()
            res.status(StatusCodes.OK).send(vehicles)
        } catch (err) {
            next(err)
        }
    }

    public async createVehicle(req: Request, res: Response, next: NextFunction) {
        try {
            const vehicle = await createVehicleService.execute(req.body)
            res.status(StatusCodes.CREATED).send(vehicle)
        } catch (err) {
            next(err)
        }
    }

    public async listAvailableVehicles(_: Request, res: Response, next: NextFunction) {
        try {
            const vehicles = (await listVehicleService.execute()).filter((v) => v.available === true)
            res.status(StatusCodes.OK).send(vehicles)
        } catch (err) {
            next(err)
        }
    }
}

export const vehicleController = new VehicleController()
