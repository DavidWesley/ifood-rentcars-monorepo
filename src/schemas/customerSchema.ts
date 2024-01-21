import { z } from "zod"

import { Customer } from "@/models/customer.ts"
import { customerCPFSchema } from "@/schemas/commons.ts"
import { TimeUnits } from "@/utils/timeUnits.ts"

export type SettableCustomerProperties = Omit<Customer, "id">

export type SettableCustomerPropertiesObjectType = {
    [key in keyof SettableCustomerProperties]: z.ZodType<SettableCustomerProperties[key]>
}

export const createCustomerBodySchema = z.object<SettableCustomerPropertiesObjectType>({
    name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caractere." }),
    email: z.string().email(),
    gender: z.enum(["male", "female", "other"]),
    license: z.enum(["A", "B"]),
    birthDate: z.coerce.date().refine(
        (date) => {
            const today = new Date()
            const duration = today.getTime() - date.getTime()
            const resolvedDuration = TimeUnits.convertTimeDurationToParts(duration, "millisecond", "year")
            const isAdult = resolvedDuration.year! >= 18
            return isAdult
        },
        { message: "O cliente deve ter pelo menos 18 anos." }
    ),
    CPF: customerCPFSchema,
})
