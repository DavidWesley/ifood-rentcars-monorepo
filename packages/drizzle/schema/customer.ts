import { UUID, randomUUID } from "node:crypto"
import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

const LICENSES_TYPES_ENUM = ["A", "B"] as const

export const customers = sqliteTable("customers", {
    id: text("id", { mode: "text", length: 36 })
        .primaryKey()
        .unique()
        .notNull()
        .$defaultFn(() => randomUUID())
        .$type<UUID>(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    cpf: text("cpf", { mode: "text", length: 11 }).unique().notNull(),
    birthDate: integer("birth_date", { mode: "timestamp" }).notNull(), // Date
    license: text("license_type", { mode: "text", length: 1, enum: LICENSES_TYPES_ENUM }).notNull(),
    gender: text("gender", { mode: "text", enum: ["male", "female", "other"] }).notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
})

// export const customersRelations = relations(customers, ({ one, many }) => ({}))
