import { z } from "zod"

import { VehicleTypeEnum } from "@/models/vehicle.ts"

// INFO: Schema de validação dos dados necessários para criar um veículo
export const createVehicleBodySchema = z.object({
    plate: z
        .string()
        .regex(/(^[A-Z]{3}-?\d{4}$)|(^[A-Z]{3}\d[A-Z]{1}\d{2}$)/, {
            message: "Formato de placa inválido. Use o formato ABC-1234, ABC1234 ou ABC1D23",
        }),
    type: z.nativeEnum(VehicleTypeEnum, {
        errorMap(issue) {
            switch (issue.code) {
                case "invalid_enum_value":
                    return { message: "Selecione uma categoria de CNH." }
                case "invalid_type":
                    return { message: "O tipo do dado informado é inválido." }
                default:
                    return { message: "O tipo de CNH informada ou é inválida ou ainda não é aceita pelo sistema." }
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
        errorMap(issue) {
            switch (issue.code) {
                case "invalid_enum_value":
                    return { message: "Selecione uma cor." }
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

    hourlyRate: z.number().nonnegative({ message: "A taxa deve ser positiva." }).min(10.0, { message: "A taxa deve ser igual ou superior a 10." }),
})
