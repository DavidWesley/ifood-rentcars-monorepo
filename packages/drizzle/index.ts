import Database from "better-sqlite3"
import { type BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3"

import * as schema from "./schema"

export const sqlite = new Database("../../sqlite.db", { fileMustExist: true, readonly: false })
export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, {
    schema,
})
