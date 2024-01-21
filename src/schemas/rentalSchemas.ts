import { z } from "zod"

import { RentalProps } from "@/models/rental.ts"
import { customerCPFSchema, vehiclePlateSchema } from "@/schemas/commons.ts"
import { TimeUnits } from "@/utils/timeUnits.ts"

export type SettableRentalProperties = Omit<RentalProps, "id" | "returnDate" | "status">

export type SettableRentalPropertiesObjectType = {
    [key in keyof SettableRentalProperties]: z.ZodType<SettableRentalProperties[key]>
}

export const createRentalBodySchema = z
    .object({
        cpf: customerCPFSchema,
        plate: vehiclePlateSchema,
        startDate: z.coerce.date().refine(
            (date) => {
                const today = new Date()
                return today < date
            },
            { message: "A data de início deve ser superior ou igual a data atual." }
        ),
        endDate: z.coerce.date().refine(
            (date) => {
                const today = new Date()
                return today < date
            },
            { message: "A data de fim deve ser superior ou igual a data atual." }
        ),
    })
    .superRefine((data, ctx) => {
        const { startDate, endDate } = data
        if (endDate < startDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.invalid_date,
                message: "A data de fim deve ser superior ou igual a data de início do aluguel",
                fatal: true,
                path: ["endDate"],
            })
        }

        const diffDurationBetweenDates = endDate.getTime() - startDate.getTime()
        const diffDurationTimeInHours = TimeUnits.convertTimeDurationToParts(diffDurationBetweenDates, "millisecond", "hour").hour!

        if (diffDurationTimeInHours < 24) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "A diferença mínima entre as datas de fim e início deve ser de 24 horas",
                path: ["startDate", "endDate"],
                fatal: true,
            })
        }
    })

export const finishRentalBodySchema = z.object({
    cpf: customerCPFSchema,
})
