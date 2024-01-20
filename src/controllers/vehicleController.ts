import { NextFunction, Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

import { BaseError } from "@/errors/BaseError.ts"
import { ValidationError } from "@/errors/ValidationError.ts"
import { createVehicleService } from "@/services/vehicle/CreateVehicleService.ts"
import { listVehicleService } from "@/services/vehicle/ListVehicleService.ts"

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
            const vehicle = await createVehicleService.execute(req.body)
            res.status(StatusCodes.CREATED).send(vehicle)

            next()
        } catch (err) {
            if (err instanceof ValidationError) {
                res.status(err.statusCode).send({
                    code: err.errorCode,
                    message: err.message,
                    errors: err.fieldValidationErrors,
                })
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send({
                    name: err.name,
                    message: err.message,
                    code: err.errorCode,
                })
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
                })
            }

            next()
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
