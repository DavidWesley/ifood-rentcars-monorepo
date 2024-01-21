import { TimeUnits } from "@/utils/timeUnits.ts"

export function calculateDurationBetweenDatesInHours(from: Date, to: Date): number {
    const duration = Math.abs(to.getTime() - from.getTime())
    const { hour } = TimeUnits.convertTimeDurationToParts(duration, "millisecond", "hour")
    return hour!
}
