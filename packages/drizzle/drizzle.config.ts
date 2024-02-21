import { ENV } from "@repo/env"
import type { Config } from "drizzle-kit"

export default {
    schema: "./schema/index.ts",
    out: "./migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: ENV.DATABASE_URL,
        ssl: true,
    },
    verbose: true,
    strict: true,
} satisfies Config
