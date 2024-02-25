import { env } from "node:process"
import { z } from "zod"

const serverEnvSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().positive().min(80).max(65_000).default(3333),
    HOST: z.string().ip().default("127.0.0.1"),
    DATABASE_URL: z.string().url(),
})

let SERVER_ENV: z.output<typeof serverEnvSchema>

try {
    SERVER_ENV = serverEnvSchema.parse(env)
} catch {
    process.stderr.write("[ENV] Variáveis de ambiente do servidor pendentes")
    process.exit(1)
}

export { SERVER_ENV, serverEnvSchema }
