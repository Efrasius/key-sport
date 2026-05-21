export function getColor(status: string | undefined, theme: TeamConfig['theme']) {
    switch (status) {
        case 'live':
            return theme.tabIconSelectedColor
        case 'lost':
            return '#FF6B6B'
        case 'won':
            return '#4CAF82'
        case 'upcoming':
            return '#F0A500'
        default:
            return theme.textColor
    }
}