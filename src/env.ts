import { z } from "zod"

import { env, versions } from "node:process"

const [major, minor] = versions.node.split(".", 2).map((value) => Number.parseInt(value, 10)) as [number, number]

if (Boolean((major >= 20 && minor >= 11) || major >= 21) === false) {
    console.error("This program must be executed with Node >= v20.11.1")
    process.exit(1)
}

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().positive().min(80).max(65_000).default(3333),
    HOST: z.string().ip().default("127.0.0.1"),
})

const ENV = envSchema.parse(env)

export { ENV }
