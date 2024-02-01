import express from "express"
import { rateLimit } from "express-rate-limit"
import helmet from "helmet"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

import { InvalidRouteError } from "@/errors/InvalidRouteError.ts"
import { ErrorHandlerMiddleware } from "@/middlewares/ErrorHandlerMiddleware.ts"
import { LogMiddleware } from "@/middlewares/LogMiddleware.ts"
import { customerRouter } from "@/routes/customerRoutes.ts"
import { invoiceRouter } from "@/routes/invoiceRoutes.ts"
import { rentalRouter } from "@/routes/rentalRoutes.ts"
import { vehicleRouter } from "@/routes/vehicleRoutes.ts"

const server = express()
const ALLOW_LIST_IPS = ["127.0.0.1", "::1"]

const defaultRateLimiter = rateLimit({
    limit: 10,
    windowMs: 1_000 * 30, // 30 seconds
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    statusCode: StatusCodes.TOO_MANY_REQUESTS,
    skip: (req) => ALLOW_LIST_IPS.includes(req.ip!),
})

server.use(defaultRateLimiter)
server.use(express.json())
server.use(helmet())

//// BEFORE ALL MIDDLEWARES ////
server.use(LogMiddleware.handle)

server.get("/check", async (_, res) => {
    return res.status(StatusCodes.OK).send(ReasonPhrases.OK)
})

//// ROUTES ////
server.use("/vehicles", vehicleRouter)
server.use("/customers", customerRouter)
server.use("/rentals", rentalRouter)
server.use("/invoices", invoiceRouter)

//// AFTER ALL MIDDLEWARES ////

server.use((_req, _res, next) => next(new InvalidRouteError("Rota não encontrada")))
server.use(ErrorHandlerMiddleware.handle)

export { server }
