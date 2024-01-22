import { VehicleNotFoundError } from "@/errors/vehicle/VehicleNotFoundError.ts"
import { Rental } from "@/models/rental.ts"
import { vehicleRepository } from "@/repositories/vehicleRepository.ts"
import { calculateDurationBetweenDatesInHours } from "@/utils/calculateDurationBetweenDatesInHours.ts"
import { TimeUnits } from "@/utils/timeUnits.ts"

export class CalculateTotalAmount {
    private static OVERDUE_FEE_MULTIPLIER = 2

    public static async calculate(rental: Required<Rental>): Promise<number> {
        const vehicle = await vehicleRepository.findById(rental.vehicleId)
        if (vehicle === null) {
            throw new VehicleNotFoundError(rental.vehicleId)
        }

        const normalizedReturnDate = rental.returnDate ?? new Date()

        if (normalizedReturnDate < rental.startDate) {
            // INFO:
            // Modo de cancelamento de aluguel antes do início do aluguel
            // Cliente deve pagar uma multa equivalente a uma diária de aluguel
            return 24 * vehicle.hourlyRentalRate
        } else if (normalizedReturnDate > rental.endDate) {
            // INFO:
            // Modo de encerramento de aluguel apos o fim do prazo determinado
            // Cliente deve pagar uma multa equivalente a duas diárias de aluguel por dia de atraso

            const daysOverdue = TimeUnits.convertTimeDurationToParts(
                calculateDurationBetweenDatesInHours(rental.endDate, normalizedReturnDate),
                "hour",
                "day"
            ).day!

            const regularCost = Math.ceil(calculateDurationBetweenDatesInHours(rental.startDate, rental.endDate)) * vehicle.hourlyRentalRate
            const overdueCost = Math.ceil(daysOverdue) * vehicle.hourlyRentalRate * CalculateTotalAmount.OVERDUE_FEE_MULTIPLIER

            return regularCost + overdueCost
        }

        return Math.ceil(calculateDurationBetweenDatesInHours(rental.startDate, normalizedReturnDate)) * vehicle.hourlyRentalRate
    }
}
