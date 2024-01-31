import { z } from "zod"

import { env } from "node:process"

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().positive().min(80).max(65_000).default(3333),
    HOST: z.string().ip().default("127.0.0.1"),
})

const ENV = envSchema.parse(env)

export { ENV }
