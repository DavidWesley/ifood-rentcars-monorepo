import { createVehicleService } from "@/services/CreateVehicleService.ts"
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

    public async createVehicle(req: Request, res: Response, next: NextFunction) {
        try {
            const {plate, type, brand, model, manufacturingYear, color, mass, license, hourlyRentalRate } = req.body;
            const vehicle = await createVehicleService.execute({plate, type, brand, model, manufacturingYear, color, mass, license, hourlyRentalRate});
            res.status(StatusCodes.CREATED).send(vehicle);

            next();

        } catch (err) {

            next();
        }
    }

    public async listAvailableVehicles(_: Request, res: Response, next: NextFunction) {
        try {
            const vehicles = (await listVehicleService.execute()).filter((v) => v.available === true)
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