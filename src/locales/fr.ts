export const fr = {
  match: {
    status: {
      won: 'Gagné',
      lost: 'Perdu',
      live: 'Live',
      upcoming: 'À venir',
    },
    timeUntil: {
      soon: 'Bientôt',
      days: (n: number) => `Dans ${n} jour${n > 1 ? 's' : ''}`,
      hours: (n: number) => `Dans ${n} heure${n > 1 ? 's' : ''}`,
    },
  },
}