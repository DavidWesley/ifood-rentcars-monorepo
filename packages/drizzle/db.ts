import { ENV } from "@repo/env"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema/index.ts"

// for migrations
// const migrationClient = postgres(ENV.DATABASE_URL, { max: 1, ssl: "require" })
// migrate(drizzle(migrationClient), { migrationsFolder: "./migrations" })

// for query purposes
export const connection = postgres(ENV.DATABASE_URL, { max: 4, ssl: ENV.NODE_ENV === "production" ? "require" : false })
export const db = drizzle(connection, {
    schema,
    logger: ENV.NODE_ENV === "development",
})
