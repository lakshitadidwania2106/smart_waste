export const dummyData = {
  zones: [
    { id: 'north', name: 'North Green Zone', households: 2400 },
    { id: 'central', name: 'Central Eco District', households: 3200 },
    { id: 'south', name: 'South Riverside', households: 1800 },
  ],
  bins: [
    {
      id: 'BIN-101',
      zoneId: 'north',
      location: 'Maple St & 5th Ave',
      fillLevel: 92,
      status: 'Full',
      lastCollected: '2025-01-12T08:30:00Z',
    },
    {
      id: 'BIN-102',
      zoneId: 'north',
      location: 'Community Park',
      fillLevel: 44,
      status: 'Active',
      lastCollected: '2025-01-12T06:00:00Z',
    },
    {
      id: 'BIN-201',
      zoneId: 'central',
      location: 'Tech Hub Plaza',
      fillLevel: 68,
      status: 'Active',
      lastCollected: '2025-01-12T07:20:00Z',
    },
    {
      id: 'BIN-202',
      zoneId: 'central',
      location: 'Metro Station',
      fillLevel: 81,
      status: 'Full',
      lastCollected: '2025-01-12T05:45:00Z',
    },
    {
      id: 'BIN-301',
      zoneId: 'south',
      location: 'Riverside Walk',
      fillLevel: 37,
      status: 'Active',
      lastCollected: '2025-01-12T04:15:00Z',
    },
  ],
  feedback: [
    { id: 1, name: 'Aanya', zoneId: 'central', rating: 5, message: 'Bins are well placed and signage is clear.', date: '2025-01-10' },
    { id: 2, name: 'Ravi', zoneId: 'north', rating: 4, message: 'Great initiative. More bins near bus stop would help.', date: '2025-01-11' },
    { id: 3, name: 'Meera', zoneId: 'south', rating: 3, message: 'One bin was full yesterday evening.', date: '2025-01-12' },
  ],
  worker: {
    name: 'Priya Nair',
    zoneId: 'north',
    shift: '06:00 - 14:00',
  },
  customer: {
    name: 'Aditya',
    zoneId: 'central',
    score: 72,
  },
}

