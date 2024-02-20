import { drizzle } from "drizzle-orm/better-sqlite3"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import { sqlite as connection } from "."

const db = drizzle(connection)

migrate(db, { migrationsFolder: "./migrations" })

connection.close()
