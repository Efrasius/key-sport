import { Timestamp } from "firebase/firestore"

export interface Match {
    id: string
    teams: string[]
    game: string
    date: Timestamp
    status: 'won' | 'lost' | 'live' | 'upcoming'
    tournament: string
}