import { UUID } from "node:crypto"
import { relations } from "drizzle-orm"
import { date, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { customers } from "./customer.ts"
import { vehicles } from "./vehicle.ts"

export const rentals = pgTable("rentals", {
    id: uuid("id").primaryKey().notNull().unique().defaultRandom().$type<UUID>(),
    customerId: uuid("customer_id")
        .notNull()
        .$type<UUID>()
        .references(() => customers.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    vehicleId: uuid("vehicle_id")
        .notNull()
        .$type<UUID>()
        .references(() => vehicles.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),

    status: text("status", { enum: ["inProgress", "completed", "cancelled"] })
        .notNull()
        .default("inProgress"),
    startDate: date("start_date", { mode: "date" }).notNull(),
    endDate: date("end_date", { mode: "date" }).notNull(),
    returnDate: date("return_date", { mode: "date" }),
    createdAt: date("created_at", { mode: "date" }).notNull().defaultNow(),
})

export const rentalsRelations = relations(rentals, ({ one }) => ({
    customer: one(customers, {
        fields: [rentals.customerId],
        references: [customers.id],
    }),
    vehicle: one(vehicles, {
        fields: [rentals.vehicleId],
        references: [vehicles.id],
    }),
}))
