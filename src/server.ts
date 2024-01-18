import express from "express"
import { rateLimit } from "express-rate-limit"
import helmet from "helmet"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { vehicleRouter } from "./routes/vehicleRoutes.ts"

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

server.get("/check", async (_, res) => {
    return res.status(StatusCodes.OK).send(ReasonPhrases.OK)
})

//// ROUTES ////
server.use("/vehicles", vehicleRouter)

export { server }
