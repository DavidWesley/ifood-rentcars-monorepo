import http, { Server } from "node:http"

import cors from "cors"
import express, { Application } from "express"
import { rateLimit } from "express-rate-limit"
import helmet from "helmet"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

import { customerRouter } from "@/routes/customerRoutes.ts"
import { invoiceRouter } from "@/routes/invoiceRoutes.ts"
import { rentalRouter } from "@/routes/rentalRoutes.ts"
import { vehicleRouter } from "@/routes/vehicleRoutes.ts"

import { ErrorHandlerMiddleware } from "@/routes/middlewares/ErrorHandlerMiddleware.ts"
import { LogMiddleware } from "@/routes/middlewares/LogMiddleware.ts"

const app: Application = express()
const server: Server = http.createServer(app)

const ALLOW_LIST_IPS = ["127.0.0.1", "::1"]

const defaultRateLimiter = rateLimit({
    limit: 10,
    windowMs: 1_000 * 30, // 30 seconds
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    statusCode: StatusCodes.TOO_MANY_REQUESTS,
    skip: (req) => ALLOW_LIST_IPS.some((ip) => ip === req.ip),
})

app.use(cors())
app.use(defaultRateLimiter)
app.use(express.json())
app.use(helmet())

//// BEFORE ALL MIDDLEWARES ////
app.use(LogMiddleware.handle)

app.get("/check", async (_, res) => {
    return res.status(StatusCodes.OK).send(ReasonPhrases.OK)
})

//// ROUTES ////
app.use("/vehicles", vehicleRouter)
app.use("/customers", customerRouter)
app.use("/rentals", rentalRouter)
app.use("/invoices", invoiceRouter)

//// AFTER ALL MIDDLEWARES ////
// app.use((_, __, next) => {
//     const error = new InvalidRouteError("Rota não encontrada")
//     next(error)
// })
app.use(ErrorHandlerMiddleware.handle)

export { server }
