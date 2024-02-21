import { UUID } from "node:crypto"
import { boolean, date, decimal, integer, numeric, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core"

const VEHICLE_TYPE_ENUM = ["car", "motorcycle"] as const

export const vehicles = pgTable("vehicles", {
    id: uuid("id").primaryKey().notNull().unique().defaultRandom().$type<UUID>(),
    plate: varchar("name", { length: 8 }).unique().notNull(),
    type: text("type", { enum: VEHICLE_TYPE_ENUM }).notNull(),
    brand: text("brand").notNull().default(""),
    model: text("model").notNull().default(""),
    color: text("color").notNull().default(""),
    manufacturingYear: integer("year").notNull(),
    mass: integer("mass").notNull(), // TODO: mudar isso depois
    hourlyRentalRate: integer("rental_rate").notNull(), // TODO: mudar isso depois
    license: varchar("license_type", { length: 1, enum: ["A", "B"] }).notNull(),
    available: boolean("available").notNull().default(true),
    popularity: integer("popularity").notNull().default(0),
    createdAt: date("created_at", { mode: "date" }).notNull().defaultNow(),
})

// export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({}))
