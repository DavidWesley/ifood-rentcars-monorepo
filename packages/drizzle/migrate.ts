import { migrate } from "drizzle-orm/postgres-js/migrator"
import { connection, db } from "./db.ts"
// const migrationClient = postgres(ENV.DATABASE_URL, { max: 1, ssl: "require" })

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: "./migrations" })

// Don't forget to close the connection, otherwise the script will hang
await connection.end()
