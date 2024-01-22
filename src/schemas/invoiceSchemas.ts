import { z } from "zod"

import { InvoiceStatus } from "@/models/invoice.ts"
import { customerCPFSchema } from "@/schemas/commons.ts"

export const listCustomerInvoicesBodySchema = z.object({
    cpf: customerCPFSchema,
})

export const listInvoicesQuerySchema = z.object({
    state: z.nativeEnum(InvoiceStatus).optional(),
})
