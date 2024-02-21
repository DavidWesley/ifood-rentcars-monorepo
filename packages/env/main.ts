import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

const ENV = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
        PORT: z.coerce.number().positive().min(80).max(65_000).default(3333),
        HOST: z.string().ip().default("127.0.0.1"),
        DATABASE_URL: z.string().url(),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL,
        HOST: process.env.HOST,
        PORT: process.env.PORT,
    },
    emptyStringAsUndefined: true,
})

export { ENV }
