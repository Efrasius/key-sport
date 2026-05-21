export function getTimeUntil(
    date: Date,
    t: { soon: string; days: (n: number) => string; hours: (n: number) => string }
): string {
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const diffHours = Math.round(diffMs / (1000 * 60 * 60))
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return t.soon
    if (diffDays >= 1) return t.days(diffDays)
    return t.hours(diffHours)
}