import { LicenseType, getLicenseTypeFromVehicleType } from "@/models/license.ts"
import { VehicleType } from "@/models/vehicle.ts"

export class LicenseValidationService {
    public static validateForVehicleType(license: LicenseType, vehicleType: VehicleType): boolean {
        if (license !== getLicenseTypeFromVehicleType(vehicleType, 1_000)) {
            return false
        }

        return true
    }
}
