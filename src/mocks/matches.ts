import { Match } from '../types/match'

export const mockMatches: Match[] = [
  {
    id: '1',
    teams: ['Mandatory', 'KCorp'],
    game: 'valorant',
    date: new Date('2025-06-14T18:00:00'),
    status: 'live',
    tournament: 'VCL France — Semaine 6',
  },
  {
    id: '2',
    teams: ['Mandatory', 'Echo'],
    game: 'wow',
    date: new Date('2026-06-14T20:00:00'),
    status: 'upcoming',
    tournament: 'MDI — Demi-finale',
  },
  {
    id: '3',
    teams: ['Mandatory', 'Gentle Mates'],
    game: 'valorant',
    date: new Date('2026-06-15T14:00:00'),
    status: 'upcoming',
    tournament: 'VCL France — Semaine 7',
  },
  {
    id: '4',
    teams: ['Mandatory', 'Vitality'],
    game: 'valorant',
    date: new Date('2025-06-10T16:00:00'),
    status: 'won',
    tournament: 'VCL France — Semaine 5',
  },
  {
    id: '5',
    teams: ['Mandatory', 'Team Liquid'],
    game: 'wow',
    date: new Date('2025-06-08T15:00:00'),
    status: 'lost',
    tournament: 'MDI — Quart de finale',
  },
  {
    id: '6',
    teams: ['Mandatory', 'BDS'],
    game: 'valorant',
    date: new Date('2025-06-07T18:00:00'),
    status: 'won',
    tournament: 'VCL France — Semaine 4',
  },
]