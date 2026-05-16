export interface Match {
    id: string
    teams: string[]
    game: string
    date: Date
    status: 'won' | 'lost' | 'live' | 'upcoming'
    tournament: string
}