import Database from "better-sqlite3"
import { type BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3"
import * as schema from "./schema/index.ts"

export const connection = new Database("../../sqlite.db", { fileMustExist: false, readonly: false })
export const db: BetterSQLite3Database<typeof schema> = drizzle(connection, {
    schema,
})
