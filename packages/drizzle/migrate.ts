import { drizzle } from "drizzle-orm/better-sqlite3"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import { connection } from "./main.ts"

const db = drizzle(connection)

migrate(db, { migrationsFolder: "./migrations" })

connection.close()
