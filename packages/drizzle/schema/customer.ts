import { UUID } from "node:crypto"
import { relations } from "drizzle-orm"
import { date, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core"
import { rentals } from "./rental.ts"

const LICENSES_TYPES_ENUM = ["A", "B"] as const

export const customers = pgTable("customers", {
    id: uuid("id").primaryKey().notNull().unique().defaultRandom().$type<UUID>(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    cpf: varchar("cpf", { length: 11 }).unique().notNull(),
    birthDate: date("birth_date", { mode: "date" }).notNull(),
    license: varchar("license_type", { length: 1, enum: LICENSES_TYPES_ENUM }).notNull(),
    gender: varchar("gender", { enum: ["male", "female", "other"] }).notNull(),
    createdAt: date("created_at", { mode: "date" }).notNull().defaultNow(),
})

export const customersRelations = relations(customers, ({ many }) => ({
    rentals: many(rentals),
}))
