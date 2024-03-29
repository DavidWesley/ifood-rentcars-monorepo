import { InvalidLicenseTypeError } from "@/errors/license/InvalidLicenseTypeError.ts"
import { Vehicle } from "@/models/vehicle.ts"

// TODO:
// Atualizar os tipos de licenças
// E adicionar métodos específicos para validar cada aluguel pelo tipo e massa do veículo a ser alugado.
export type LicenseType = "A" | "B"
// TODO:
// Tornar a validação dos tipos de veículos mais complexa e inteligente
// Considerando exatamente o que diz a lei
export function getLicenseTypeFromVehicleType(type: Vehicle["type"], mass: Vehicle["mass"] = 1_000): LicenseType {
    if (type === "car" && mass <= 3_500) return "B"
    if (type === "motorcycle") return "A"

    throw new InvalidLicenseTypeError("O tipo de licença inserida não é suportada")
}
