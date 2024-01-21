import { z } from "zod"

import { VehicleTypeEnum } from "@/models/vehicle.ts"
import { vehiclePlateSchema } from "@/schemas/commons.ts"

// INFO: Schema de validação dos dados necessários para criar um veículo
export const createVehicleBodySchema = z.object({
    plate: vehiclePlateSchema,
    type: z.nativeEnum(VehicleTypeEnum, {
        errorMap(issue) {
            switch (issue.code) {
                case "invalid_enum_value":
                    return { message: "Selecione uma categoria válida de veículo." }
                case "invalid_type":
                    return { message: "O tipo do dado informado é inválido." }
                default:
                    return { message: "O tipo de veículo informada ou é inválido ou ainda não é aceita pelo sistema." }
            }
        },
    }),
    brand: z.string().min(1, { message: "A marca deve ter pelo menos 1 caractere." }),
    model: z.string().min(1, { message: "O modelo deve ter pelo menos 1 caractere." }),
    manufacturingYear: z
        .number({ coerce: true })
        .int({ message: "O ano de fabricação deve ser um número inteiro." })
        .min(2010, { message: "O ano de fabricação deve ser igual ou superior a 2010." })
        .max(new Date().getFullYear() + 1, { message: "O ano de fabricação deve ser inferior ou igual ao ano atual + 1." }),
    color: z.enum(["white", "black", "gray", "red", "blue", "yellow"], {
        errorMap(issue, ctx) {
            switch (issue.code) {
                case "invalid_enum_value":
                    return { message: `${ctx.data} não é uma cor válida.` }
                case "invalid_type":
                    return { message: "O tipo do dado informado é inválido." }
                default:
                    return { message: "A cor informada ou é inválida ou ainda não é aceita pelo sistema." }
            }
        },
    }),
    mass: z
        .number({ coerce: true })
        .int({ message: "A massa deve ser um número inteiro." })
        .nonnegative({ message: "A massa deve ser positiva." })
        .min(100, { message: "A massa deve ser igual ou superior a 100." })
        .max(10_000, { message: "A massa deve ser inferior ou igual a 10.000." }),

    hourlyRentalRate: z
        .number()
        .nonnegative({ message: "A taxa deve ser positiva." })
        .min(10.0, { message: "A taxa deve ser igual ou superior a 10." }),
})
