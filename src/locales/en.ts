export const en = {
  match: {
    status: {
      won: 'Won',
      lost: 'Lost',
      live: 'Live',
      upcoming: 'Upcoming',
    },
    timeUntil: {
      soon: 'Soon',
      days: (n: number) => `In ${n} day${n > 1 ? 's' : ''}`,
      hours: (n: number) => `In ${n} hour${n > 1 ? 's' : ''}`,
    },
  },
}