// Mock data for demo mode
// This file contains realistic mock data for the F1 Pick'em application
// Data structures match the actual backend API responses

export const mockUser = {
  username: 'demo-user',
  attributes: {
    email: 'demo@example.com',
    name: 'Demo User',
    sub: 'demo-user-id-12345'
  }
};

export const mockLeagues = [
  {
    id: 'league-1',
    name: 'F1 Fanatics 2024',
    season: '2024',
    owner: 'demo-user',
    members: ['demo-user', 'alice', 'bob', 'charlie', 'david'],
    createdAt: '2024-03-01T00:00:00Z',
    inviteToken: 'demo-token-abc123'
  },
  {
    id: 'league-2',
    name: 'Racing Legends',
    season: '2024',
    owner: 'alice',
    members: ['demo-user', 'alice', 'eve', 'frank'],
    createdAt: '2024-02-15T00:00:00Z',
    inviteToken: 'demo-token-xyz789'
  }
];

export const mockRaces = [
  {
    season: '2024',
    round: '1',
    raceName: 'Bahrain Grand Prix',
    circuitName: 'Bahrain International Circuit',
    locality: 'Sakhir',
    country: 'Bahrain',
    date: '2024-03-02',
    time: '15:00:00Z',
    url: 'https://en.wikipedia.org/wiki/2024_Bahrain_Grand_Prix'
  },
  {
    season: '2024',
    round: '2',
    raceName: 'Saudi Arabian Grand Prix',
    circuitName: 'Jeddah Corniche Circuit',
    locality: 'Jeddah',
    country: 'Saudi Arabia',
    date: '2024-03-09',
    time: '17:00:00Z',
    url: 'https://en.wikipedia.org/wiki/2024_Saudi_Arabian_Grand_Prix'
  },
  {
    season: '2024',
    round: '3',
    raceName: 'Australian Grand Prix',
    circuitName: 'Albert Park Circuit',
    locality: 'Melbourne',
    country: 'Australia',
    date: '2024-03-24',
    time: '05:00:00Z',
    url: 'https://en.wikipedia.org/wiki/2024_Australian_Grand_Prix'
  },
  {
    season: '2024',
    round: '4',
    raceName: 'Japanese Grand Prix',
    circuitName: 'Suzuka Circuit',
    locality: 'Suzuka',
    country: 'Japan',
    date: '2024-04-07',
    time: '05:00:00Z',
    url: 'https://en.wikipedia.org/wiki/2024_Japanese_Grand_Prix'
  },
  {
    season: '2024',
    round: '5',
    raceName: 'Chinese Grand Prix',
    circuitName: 'Shanghai International Circuit',
    locality: 'Shanghai',
    country: 'China',
    date: '2024-04-21',
    time: '07:00:00Z',
    url: 'https://en.wikipedia.org/wiki/2024_Chinese_Grand_Prix'
  },
  {
    season: '2024',
    round: '6',
    raceName: 'Miami Grand Prix',
    circuitName: 'Miami International Autodrome',
    locality: 'Miami',
    country: 'USA',
    date: '2024-05-05',
    time: '19:30:00Z',
    url: 'https://en.wikipedia.org/wiki/2024_Miami_Grand_Prix'
  }
];

export const mockDrivers = [
  { name: 'Max Verstappen', team: 'Red Bull Racing' },
  { name: 'Sergio Pérez', team: 'Red Bull Racing' },
  { name: 'Charles Leclerc', team: 'Ferrari' },
  { name: 'Carlos Sainz', team: 'Ferrari' },
  { name: 'Lando Norris', team: 'McLaren' },
  { name: 'Oscar Piastri', team: 'McLaren' },
  { name: 'George Russell', team: 'Mercedes' },
  { name: 'Lewis Hamilton', team: 'Mercedes' },
  { name: 'Fernando Alonso', team: 'Aston Martin' },
  { name: 'Lance Stroll', team: 'Aston Martin' },
  { name: 'Pierre Gasly', team: 'Alpine' },
  { name: 'Esteban Ocon', team: 'Alpine' },
  { name: 'Alexander Albon', team: 'Williams' },
  { name: 'Logan Sargeant', team: 'Williams' },
  { name: 'Valtteri Bottas', team: 'Alfa Romeo' },
  { name: 'Zhou Guanyu', team: 'Alfa Romeo' },
  { name: 'Nico Hulkenberg', team: 'Haas' },
  { name: 'Kevin Magnussen', team: 'Haas' },
  { name: 'Yuki Tsunoda', team: 'AlphaTauri' },
  { name: 'Daniel Ricciardo', team: 'AlphaTauri' }
];

// Mock picks for all users in all leagues
export const mockPicks = {
  'league-1': {
    '2024-1': {
      leagueId: 'league-1',
      userId: 'demo-user',
      season: '2024',
      round: '1',
      picks: ['Max Verstappen', 'Sergio Pérez', 'Carlos Sainz', 'Charles Leclerc', 'George Russell', 'Lando Norris', 'Lewis Hamilton', 'Oscar Piastri', 'Fernando Alonso', 'Lance Stroll'],
      submittedAt: '2024-03-01T12:00:00Z'
    },
    '2024-2': {
      leagueId: 'league-1',
      userId: 'demo-user',
      season: '2024',
      round: '2',
      picks: ['Max Verstappen', 'Sergio Pérez', 'Charles Leclerc', 'Oscar Piastri', 'Lando Norris', 'Fernando Alonso', 'George Russell', 'Lewis Hamilton', 'Carlos Sainz', 'Lance Stroll'],
      submittedAt: '2024-03-08T10:00:00Z'
    },
    '2024-3': {
      leagueId: 'league-1',
      userId: 'demo-user',
      season: '2024',
      round: '3',
      picks: ['Carlos Sainz', 'Charles Leclerc', 'Lando Norris', 'Oscar Piastri', 'Max Verstappen', 'Sergio Pérez', 'George Russell', 'Lewis Hamilton', 'Fernando Alonso', 'Pierre Gasly'],
      submittedAt: '2024-03-23T10:00:00Z'
    },
    '2024-4': {
      leagueId: 'league-1',
      userId: 'demo-user',
      season: '2024',
      round: '4',
      picks: ['Max Verstappen', 'Sergio Pérez', 'Charles Leclerc', 'Carlos Sainz', 'Lando Norris', 'Oscar Piastri', 'George Russell', 'Lewis Hamilton', 'Fernando Alonso', 'Esteban Ocon'],
      submittedAt: '2024-04-06T10:00:00Z'
    },
    '2024-5': {
      leagueId: 'league-1',
      userId: 'demo-user',
      season: '2024',
      round: '5',
      picks: ['Max Verstappen', 'Lando Norris', 'Sergio Pérez', 'Oscar Piastri', 'Charles Leclerc', 'Carlos Sainz', 'George Russell', 'Lewis Hamilton', 'Fernando Alonso', 'Lance Stroll'],
      submittedAt: '2024-04-20T10:00:00Z'
    },
    '2024-6': {
      leagueId: 'league-1',
      userId: 'demo-user',
      season: '2024',
      round: '6',
      picks: ['Lando Norris', 'Max Verstappen', 'Charles Leclerc', 'Sergio Pérez', 'Carlos Sainz', 'Lewis Hamilton', 'Oscar Piastri', 'George Russell', 'Fernando Alonso', 'Pierre Gasly'],
      submittedAt: '2024-05-04T10:00:00Z'
    }
  },
  'league-2': {
    '2024-1': {
      leagueId: 'league-2',
      userId: 'demo-user',
      season: '2024',
      round: '1',
      picks: ['Max Verstappen', 'Sergio Pérez', 'Carlos Sainz', 'Charles Leclerc', 'Lando Norris', 'George Russell', 'Oscar Piastri', 'Lewis Hamilton', 'Fernando Alonso', 'Lance Stroll'],
      submittedAt: '2024-03-01T14:00:00Z'
    },
    '2024-2': {
      leagueId: 'league-2',
      userId: 'demo-user',
      season: '2024',
      round: '2',
      picks: ['Max Verstappen', 'Sergio Pérez', 'Charles Leclerc', 'Oscar Piastri', 'Lando Norris', 'Fernando Alonso', 'George Russell', 'Lewis Hamilton', 'Carlos Sainz', 'Lance Stroll'],
      submittedAt: '2024-03-08T14:00:00Z'
    },
    '2024-3': {
      leagueId: 'league-2',
      userId: 'demo-user',
      season: '2024',
      round: '3',
      picks: ['Carlos Sainz', 'Charles Leclerc', 'Lando Norris', 'Oscar Piastri', 'Sergio Pérez', 'George Russell', 'Lewis Hamilton', 'Fernando Alonso', 'Max Verstappen', 'Pierre Gasly'],
      submittedAt: '2024-03-23T14:00:00Z'
    },
    '2024-4': {
      leagueId: 'league-2',
      userId: 'demo-user',
      season: '2024',
      round: '4',
      picks: ['Max Verstappen', 'Sergio Pérez', 'Carlos Sainz', 'Charles Leclerc', 'Lando Norris', 'Oscar Piastri', 'George Russell', 'Fernando Alonso', 'Lewis Hamilton', 'Esteban Ocon'],
      submittedAt: '2024-04-06T14:00:00Z'
    },
    '2024-5': {
      leagueId: 'league-2',
      userId: 'demo-user',
      season: '2024',
      round: '5',
      picks: ['Max Verstappen', 'Sergio Pérez', 'Lando Norris', 'Oscar Piastri', 'Charles Leclerc', 'Carlos Sainz', 'George Russell', 'Lewis Hamilton', 'Fernando Alonso', 'Lance Stroll'],
      submittedAt: '2024-04-20T14:00:00Z'
    },
    '2024-6': {
      leagueId: 'league-2',
      userId: 'demo-user',
      season: '2024',
      round: '6',
      picks: ['Max Verstappen', 'Lando Norris', 'Charles Leclerc', 'Sergio Pérez', 'Carlos Sainz', 'Oscar Piastri', 'Lewis Hamilton', 'George Russell', 'Fernando Alonso', 'Pierre Gasly'],
      submittedAt: '2024-05-04T14:00:00Z'
    }
  }
};

// Mock race results
export const mockRaceResults = {
  '2024-1': {
    season: '2024',
    round: '1',
    raceName: 'Bahrain Grand Prix',
    results: [
      { position: '1', driver: 'Max Verstappen', team: 'Red Bull Racing', points: 25 },
      { position: '2', driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 18 },
      { position: '3', driver: 'Carlos Sainz', team: 'Ferrari', points: 15 },
      { position: '4', driver: 'Charles Leclerc', team: 'Ferrari', points: 12 },
      { position: '5', driver: 'George Russell', team: 'Mercedes', points: 10 },
      { position: '6', driver: 'Lando Norris', team: 'McLaren', points: 8 },
      { position: '7', driver: 'Lewis Hamilton', team: 'Mercedes', points: 6 },
      { position: '8', driver: 'Oscar Piastri', team: 'McLaren', points: 4 },
      { position: '9', driver: 'Fernando Alonso', team: 'Aston Martin', points: 2 },
      { position: '10', driver: 'Lance Stroll', team: 'Aston Martin', points: 1 }
    ]
  },
  '2024-2': {
    season: '2024',
    round: '2',
    raceName: 'Saudi Arabian Grand Prix',
    results: [
      { position: '1', driver: 'Max Verstappen', team: 'Red Bull Racing', points: 25 },
      { position: '2', driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 18 },
      { position: '3', driver: 'Charles Leclerc', team: 'Ferrari', points: 15 },
      { position: '4', driver: 'Oscar Piastri', team: 'McLaren', points: 12 },
      { position: '5', driver: 'Lando Norris', team: 'McLaren', points: 10 },
      { position: '6', driver: 'Fernando Alonso', team: 'Aston Martin', points: 8 },
      { position: '7', driver: 'George Russell', team: 'Mercedes', points: 6 },
      { position: '8', driver: 'Lewis Hamilton', team: 'Mercedes', points: 4 },
      { position: '9', driver: 'Carlos Sainz', team: 'Ferrari', points: 2 },
      { position: '10', driver: 'Lance Stroll', team: 'Aston Martin', points: 1 }
    ]
  },
  '2024-3': {
    season: '2024',
    round: '3',
    raceName: 'Australian Grand Prix',
    results: [
      { position: '1', driver: 'Carlos Sainz', team: 'Ferrari', points: 25 },
      { position: '2', driver: 'Charles Leclerc', team: 'Ferrari', points: 18 },
      { position: '3', driver: 'Lando Norris', team: 'McLaren', points: 15 },
      { position: '4', driver: 'Oscar Piastri', team: 'McLaren', points: 12 },
      { position: '5', driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 10 },
      { position: '6', driver: 'George Russell', team: 'Mercedes', points: 8 },
      { position: '7', driver: 'Lewis Hamilton', team: 'Mercedes', points: 6 },
      { position: '8', driver: 'Fernando Alonso', team: 'Aston Martin', points: 4 },
      { position: '9', driver: 'Max Verstappen', team: 'Red Bull Racing', points: 2 },
      { position: '10', driver: 'Pierre Gasly', team: 'Alpine', points: 1 }
    ]
  },
  '2024-4': {
    season: '2024',
    round: '4',
    raceName: 'Japanese Grand Prix',
    results: [
      { position: '1', driver: 'Max Verstappen', team: 'Red Bull Racing', points: 25 },
      { position: '2', driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 18 },
      { position: '3', driver: 'Carlos Sainz', team: 'Ferrari', points: 15 },
      { position: '4', driver: 'Charles Leclerc', team: 'Ferrari', points: 12 },
      { position: '5', driver: 'Lando Norris', team: 'McLaren', points: 10 },
      { position: '6', driver: 'Oscar Piastri', team: 'McLaren', points: 8 },
      { position: '7', driver: 'George Russell', team: 'Mercedes', points: 6 },
      { position: '8', driver: 'Lewis Hamilton', team: 'Mercedes', points: 4 },
      { position: '9', driver: 'Fernando Alonso', team: 'Aston Martin', points: 2 },
      { position: '10', driver: 'Esteban Ocon', team: 'Alpine', points: 1 }
    ]
  },
  '2024-5': {
    season: '2024',
    round: '5',
    raceName: 'Chinese Grand Prix',
    results: [
      { position: '1', driver: 'Max Verstappen', team: 'Red Bull Racing', points: 25 },
      { position: '2', driver: 'Lando Norris', team: 'McLaren', points: 18 },
      { position: '3', driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 15 },
      { position: '4', driver: 'Oscar Piastri', team: 'McLaren', points: 12 },
      { position: '5', driver: 'Charles Leclerc', team: 'Ferrari', points: 10 },
      { position: '6', driver: 'Carlos Sainz', team: 'Ferrari', points: 8 },
      { position: '7', driver: 'George Russell', team: 'Mercedes', points: 6 },
      { position: '8', driver: 'Lewis Hamilton', team: 'Mercedes', points: 4 },
      { position: '9', driver: 'Fernando Alonso', team: 'Aston Martin', points: 2 },
      { position: '10', driver: 'Lance Stroll', team: 'Aston Martin', points: 1 }
    ]
  },
  '2024-6': {
    season: '2024',
    round: '6',
    raceName: 'Miami Grand Prix',
    results: [
      { position: '1', driver: 'Lando Norris', team: 'McLaren', points: 25 },
      { position: '2', driver: 'Max Verstappen', team: 'Red Bull Racing', points: 18 },
      { position: '3', driver: 'Charles Leclerc', team: 'Ferrari', points: 15 },
      { position: '4', driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 12 },
      { position: '5', driver: 'Carlos Sainz', team: 'Ferrari', points: 10 },
      { position: '6', driver: 'Lewis Hamilton', team: 'Mercedes', points: 8 },
      { position: '7', driver: 'Oscar Piastri', team: 'McLaren', points: 6 },
      { position: '8', driver: 'George Russell', team: 'Mercedes', points: 4 },
      { position: '9', driver: 'Fernando Alonso', team: 'Aston Martin', points: 2 },
      { position: '10', driver: 'Pierre Gasly', team: 'Alpine', points: 1 }
    ]
  }
};

// Mock race scores with complete breakdown
// Backend returns: { user_scores: [{ user_id, user_name, total_score, score_pending, breakdown: [{ driver, picked_position, actual_position, points }] }], pending_results: bool }
export const mockRaceScores = {
  // League 1 - Race 1 (Bahrain)
  'league-1-2024-1': {
    user_scores: [
      { 
        user_id: 'alice', 
        user_name: 'Alice Smith', 
        total_score: 92, 
        score_pending: false, 
        breakdown: [
          { driver: 'Max Verstappen', picked_position: 1, actual_position: 1, points: 25 },
          { driver: 'Sergio Pérez', picked_position: 2, actual_position: 2, points: 18 },
          { driver: 'Carlos Sainz', picked_position: 3, actual_position: 3, points: 15 },
          { driver: 'Charles Leclerc', picked_position: 4, actual_position: 4, points: 12 },
          { driver: 'George Russell', picked_position: 5, actual_position: 5, points: 10 },
          { driver: 'Lando Norris', picked_position: 6, actual_position: 6, points: 8 },
          { driver: 'Lewis Hamilton', picked_position: 7, actual_position: 7, points: 6 },
          { driver: 'Oscar Piastri', picked_position: 8, actual_position: 8, points: 0 },
          { driver: 'Fernando Alonso', picked_position: 9, actual_position: 9, points: 0 },
          { driver: 'Lance Stroll', picked_position: 10, actual_position: 10, points: 0 }
        ]
      },
      { 
        user_id: 'demo-user', 
        user_name: 'Demo User', 
        total_score: 89, 
        score_pending: false, 
        breakdown: [
          { driver: 'Max Verstappen', picked_position: 1, actual_position: 1, points: 25 },
          { driver: 'Sergio Pérez', picked_position: 2, actual_position: 2, points: 18 },
          { driver: 'Carlos Sainz', picked_position: 3, actual_position: 3, points: 15 },
          { driver: 'Charles Leclerc', picked_position: 4, actual_position: 4, points: 12 },
          { driver: 'George Russell', picked_position: 5, actual_position: 5, points: 10 },
          { driver: 'Lando Norris', picked_position: 6, actual_position: 6, points: 8 },
          { driver: 'Lewis Hamilton', picked_position: 7, actual_position: 7, points: 6 },
          { driver: 'Oscar Piastri', picked_position: 8, actual_position: 8, points: 4 },
          { driver: 'Fernando Alonso', picked_position: 9, actual_position: 9, points: 2 },
          { driver: 'Lance Stroll', picked_position: 10, actual_position: 10, points: 0 }
        ]
      },
      { 
        user_id: 'charlie', 
        user_name: 'Charlie Brown', 
        total_score: 81, 
        score_pending: false, 
        breakdown: []
      },
      { 
        user_id: 'bob', 
        user_name: 'Bob Johnson', 
        total_score: 75, 
        score_pending: false, 
        breakdown: []
      },
      { 
        user_id: 'david', 
        user_name: 'David Lee', 
        total_score: 68, 
        score_pending: false, 
        breakdown: []
      }
    ],
    pending_results: false
  },
  // League 1 - Race 2 (Saudi Arabia)
  'league-1-2024-2': {
    user_scores: [
      { user_id: 'alice', user_name: 'Alice Smith', total_score: 95, score_pending: false, breakdown: [] },
      { user_id: 'demo-user', user_name: 'Demo User', total_score: 87, score_pending: false, breakdown: [] },
      { user_id: 'charlie', user_name: 'Charlie Brown', total_score: 79, score_pending: false, breakdown: [] },
      { user_id: 'bob', user_name: 'Bob Johnson', total_score: 72, score_pending: false, breakdown: [] },
      { user_id: 'david', user_name: 'David Lee', total_score: 65, score_pending: false, breakdown: [] }
    ],
    pending_results: false
  },
  // League 1 - Race 3 (Australia)
  'league-1-2024-3': {
    user_scores: [
      { user_id: 'demo-user', user_name: 'Demo User', total_score: 94, score_pending: false, breakdown: [] },
      { user_id: 'alice', user_name: 'Alice Smith', total_score: 88, score_pending: false, breakdown: [] },
      { user_id: 'charlie', user_name: 'Charlie Brown', total_score: 85, score_pending: false, breakdown: [] },
      { user_id: 'bob', user_name: 'Bob Johnson', total_score: 77, score_pending: false, breakdown: [] },
      { user_id: 'david', user_name: 'David Lee', total_score: 70, score_pending: false, breakdown: [] }
    ],
    pending_results: false
  },
  // League 1 - Race 4 (Japan)
  'league-1-2024-4': {
    user_scores: [
      { user_id: 'alice', user_name: 'Alice Smith', total_score: 91, score_pending: false, breakdown: [] },
      { user_id: 'charlie', user_name: 'Charlie Brown', total_score: 86, score_pending: false, breakdown: [] },
      { user_id: 'demo-user', user_name: 'Demo User', total_score: 84, score_pending: false, breakdown: [] },
      { user_id: 'bob', user_name: 'Bob Johnson', total_score: 74, score_pending: false, breakdown: [] },
      { user_id: 'david', user_name: 'David Lee', total_score: 69, score_pending: false, breakdown: [] }
    ],
    pending_results: false
  },
  // League 1 - Race 5 (China)
  'league-1-2024-5': {
    user_scores: [
      { 
        user_id: 'demo-user', 
        user_name: 'Demo User', 
        total_score: 100, 
        score_pending: false, 
        breakdown: [
          { driver: 'Max Verstappen', picked_position: 1, actual_position: 1, points: 25 },
          { driver: 'Lando Norris', picked_position: 2, actual_position: 2, points: 18 },
          { driver: 'Sergio Pérez', picked_position: 3, actual_position: 3, points: 15 },
          { driver: 'Oscar Piastri', picked_position: 4, actual_position: 4, points: 12 },
          { driver: 'Charles Leclerc', picked_position: 5, actual_position: 5, points: 10 },
          { driver: 'Carlos Sainz', picked_position: 6, actual_position: 6, points: 8 },
          { driver: 'George Russell', picked_position: 7, actual_position: 7, points: 6 },
          { driver: 'Lewis Hamilton', picked_position: 8, actual_position: 8, points: 4 },
          { driver: 'Fernando Alonso', picked_position: 9, actual_position: 9, points: 2 },
          { driver: 'Lance Stroll', picked_position: 10, actual_position: 10, points: 0 }
        ]
      },
      { user_id: 'alice', user_name: 'Alice Smith', total_score: 89, score_pending: false, breakdown: [] },
      { user_id: 'charlie', user_name: 'Charlie Brown', total_score: 83, score_pending: false, breakdown: [] },
      { user_id: 'bob', user_name: 'Bob Johnson', total_score: 76, score_pending: false, breakdown: [] },
      { user_id: 'david', user_name: 'David Lee', total_score: 71, score_pending: false, breakdown: [] }
    ],
    pending_results: false
  },
  // League 1 - Race 6 (Miami)
  'league-1-2024-6': {
    user_scores: [
      { 
        user_id: 'demo-user', 
        user_name: 'Demo User', 
        total_score: 100, 
        score_pending: false, 
        breakdown: [
          { driver: 'Lando Norris', picked_position: 1, actual_position: 1, points: 25 },
          { driver: 'Max Verstappen', picked_position: 2, actual_position: 2, points: 18 },
          { driver: 'Charles Leclerc', picked_position: 3, actual_position: 3, points: 15 },
          { driver: 'Sergio Pérez', picked_position: 4, actual_position: 4, points: 12 },
          { driver: 'Carlos Sainz', picked_position: 5, actual_position: 5, points: 10 },
          { driver: 'Lewis Hamilton', picked_position: 6, actual_position: 6, points: 8 },
          { driver: 'Oscar Piastri', picked_position: 7, actual_position: 7, points: 6 },
          { driver: 'George Russell', picked_position: 8, actual_position: 8, points: 4 },
          { driver: 'Fernando Alonso', picked_position: 9, actual_position: 9, points: 2 },
          { driver: 'Pierre Gasly', picked_position: 10, actual_position: 10, points: 0 }
        ]
      },
      { user_id: 'alice', user_name: 'Alice Smith', total_score: 92, score_pending: false, breakdown: [] },
      { user_id: 'charlie', user_name: 'Charlie Brown', total_score: 87, score_pending: false, breakdown: [] },
      { user_id: 'bob', user_name: 'Bob Johnson', total_score: 78, score_pending: false, breakdown: [] },
      { user_id: 'david', user_name: 'David Lee', total_score: 73, score_pending: false, breakdown: [] }
    ],
    pending_results: false
  },
  
  // League 2 - Race 1 (Bahrain)
  'league-2-2024-1': {
    user_scores: [
      { 
        user_id: 'alice', 
        user_name: 'Alice Smith', 
        total_score: 90, 
        score_pending: false, 
        breakdown: [
          { driver: 'Max Verstappen', picked_position: 1, actual_position: 1, points: 25 },
          { driver: 'Sergio Pérez', picked_position: 2, actual_position: 2, points: 18 },
          { driver: 'Carlos Sainz', picked_position: 3, actual_position: 3, points: 15 },
          { driver: 'Charles Leclerc', picked_position: 4, actual_position: 4, points: 12 },
          { driver: 'George Russell', picked_position: 5, actual_position: 5, points: 10 },
          { driver: 'Lando Norris', picked_position: 6, actual_position: 6, points: 8 },
          { driver: 'Lewis Hamilton', picked_position: 7, actual_position: 7, points: 2 },
          { driver: 'Oscar Piastri', picked_position: 8, actual_position: 8, points: 0 },
          { driver: 'Fernando Alonso', picked_position: 9, actual_position: 9, points: 0 },
          { driver: 'Lance Stroll', picked_position: 10, actual_position: 10, points: 0 }
        ]
      },
      { 
        user_id: 'demo-user', 
        user_name: 'Demo User', 
        total_score: 86, 
        score_pending: false, 
        breakdown: [
          { driver: 'Max Verstappen', picked_position: 1, actual_position: 1, points: 25 },
          { driver: 'Sergio Pérez', picked_position: 2, actual_position: 2, points: 18 },
          { driver: 'Carlos Sainz', picked_position: 3, actual_position: 3, points: 15 },
          { driver: 'Charles Leclerc', picked_position: 4, actual_position: 4, points: 12 },
          { driver: 'Lando Norris', picked_position: 5, actual_position: 6, points: 6 },
          { driver: 'George Russell', picked_position: 6, actual_position: 5, points: 4 },
          { driver: 'Oscar Piastri', picked_position: 7, actual_position: 8, points: 4 },
          { driver: 'Lewis Hamilton', picked_position: 8, actual_position: 7, points: 2 },
          { driver: 'Fernando Alonso', picked_position: 9, actual_position: 9, points: 0 },
          { driver: 'Lance Stroll', picked_position: 10, actual_position: 10, points: 0 }
        ]
      },
      { user_id: 'eve', user_name: 'Eve Williams', total_score: 78, score_pending: false, breakdown: [] },
      { user_id: 'frank', user_name: 'Frank Miller', total_score: 71, score_pending: false, breakdown: [] }
    ],
    pending_results: false
  },
  // League 2 - Race 2 (Saudi Arabia)
  'league-2-2024-2': {
    user_scores: [
      { user_id: 'demo-user', user_name: 'Demo User', total_score: 93, score_pending: false, breakdown: [] },
      { user_id: 'alice', user_name: 'Alice Smith', total_score: 89, score_pending: false, breakdown: [] },
      { user_id: 'eve', user_name: 'Eve Williams', total_score: 82, score_pending: false, breakdown: [] },
      { user_id: 'frank', user_name: 'Frank Miller', total_score: 75, score_pending: false, breakdown: [] }
    ],
    pending_results: false
  },
  // League 2 - Race 3 (Australia)
  'league-2-2024-3': {
    user_scores: [
      { user_id: 'alice', user_name: 'Alice Smith', total_score: 91, score_pending: false, breakdown: [] },
      { user_id: 'demo-user', user_name: 'Demo User', total_score: 88, score_pending: false, breakdown: [] },
      { user_id: 'eve', user_name: 'Eve Williams', total_score: 80, score_pending: false, breakdown: [] },
      { user_id: 'frank', user_name: 'Frank Miller', total_score: 73, score_pending: false, breakdown: [] }
    ],
    pending_results: false
  },
  // League 2 - Race 4 (Japan)
  'league-2-2024-4': {
    user_scores: [
      { user_id: 'alice', user_name: 'Alice Smith', total_score: 94, score_pending: false, breakdown: [] },
      { user_id: 'demo-user', user_name: 'Demo User', total_score: 85, score_pending: false, breakdown: [] },
      { user_id: 'eve', user_name: 'Eve Williams', total_score: 79, score_pending: false, breakdown: [] },
      { user_id: 'frank', user_name: 'Frank Miller', total_score: 72, score_pending: false, breakdown: [] }
    ],
    pending_results: false
  },
  // League 2 - Race 5 (China)
  'league-2-2024-5': {
    user_scores: [
      { user_id: 'alice', user_name: 'Alice Smith', total_score: 91, score_pending: false, breakdown: [] },
      { user_id: 'demo-user', user_name: 'Demo User', total_score: 87, score_pending: false, breakdown: [] },
      { user_id: 'eve', user_name: 'Eve Williams', total_score: 81, score_pending: false, breakdown: [] },
      { user_id: 'frank', user_name: 'Frank Miller', total_score: 74, score_pending: false, breakdown: [] }
    ],
    pending_results: false
  },
  // League 2 - Race 6 (Miami)
  'league-2-2024-6': {
    user_scores: [
      { user_id: 'alice', user_name: 'Alice Smith', total_score: 90, score_pending: false, breakdown: [] },
      { user_id: 'demo-user', user_name: 'Demo User', total_score: 86, score_pending: false, breakdown: [] },
      { user_id: 'eve', user_name: 'Eve Williams', total_score: 82, score_pending: false, breakdown: [] },
      { user_id: 'frank', user_name: 'Frank Miller', total_score: 75, score_pending: false, breakdown: [] }
    ],
    pending_results: false
  }
};

// Mock league details with valid scoreboard data
// Backend returns: { id, name, season, invite_token (if owner), members: [{ id, name, status, total_score, average_score, best_score, worst_score, races_submitted }] }
export const mockLeagueDetails = {
  'league-1': {
    id: 'league-1',
    name: 'F1 Fanatics 2024',
    season: '2024',
    invite_token: 'demo-token-abc123', // Only for owner
    members: [
      { 
        id: 'demo-user', 
        name: 'Demo User', 
        status: 'owner',
        total_score: 554,  // 89 + 87 + 94 + 84 + 100 + 100 = 554 (6 races)
        average_score: 92.33,
        best_score: 100,
        worst_score: 84,
        races_submitted: 6
      },
      { 
        id: 'alice', 
        name: 'Alice Smith', 
        status: 'member',
        total_score: 547,  // 92 + 95 + 88 + 91 + 89 + 92 = 547 (6 races)
        average_score: 91.17,
        best_score: 95,
        worst_score: 88,
        races_submitted: 6
      },
      { 
        id: 'charlie', 
        name: 'Charlie Brown', 
        status: 'member',
        total_score: 501,  // 81 + 79 + 85 + 86 + 83 + 87 = 501 (6 races)
        average_score: 83.5,
        best_score: 87,
        worst_score: 79,
        races_submitted: 6
      },
      { 
        id: 'bob', 
        name: 'Bob Johnson', 
        status: 'member',
        total_score: 452,  // 75 + 72 + 77 + 74 + 76 + 78 = 452 (6 races)
        average_score: 75.33,
        best_score: 78,
        worst_score: 72,
        races_submitted: 6
      },
      { 
        id: 'david', 
        name: 'David Lee', 
        status: 'member',
        total_score: 416,  // 68 + 65 + 70 + 69 + 71 + 73 = 416 (6 races)
        average_score: 69.33,
        best_score: 73,
        worst_score: 65,
        races_submitted: 6
      }
    ]
  },
  'league-2': {
    id: 'league-2',
    name: 'Racing Legends',
    season: '2024',
    // No invite_token because demo-user is not the owner
    members: [
      { 
        id: 'alice', 
        name: 'Alice Smith', 
        status: 'owner',
        total_score: 545,  // 90 + 89 + 91 + 94 + 91 + 90 = 545 (6 races)
        average_score: 90.83,
        best_score: 94,
        worst_score: 89,
        races_submitted: 6
      },
      { 
        id: 'demo-user', 
        name: 'Demo User', 
        status: 'member',
        total_score: 525,  // 86 + 93 + 88 + 85 + 87 + 86 = 525 (6 races)
        average_score: 87.5,
        best_score: 93,
        worst_score: 85,
        races_submitted: 6
      },
      { 
        id: 'eve', 
        name: 'Eve Williams', 
        status: 'member',
        total_score: 482,  // 78 + 82 + 80 + 79 + 81 + 82 = 482 (6 races)
        average_score: 80.33,
        best_score: 82,
        worst_score: 78,
        races_submitted: 6
      },
      { 
        id: 'frank', 
        name: 'Frank Miller', 
        status: 'member',
        total_score: 440,  // 71 + 75 + 73 + 72 + 74 + 75 = 440 (6 races)
        average_score: 73.33,
        best_score: 75,
        worst_score: 71,
        races_submitted: 6
      }
    ]
  }
};
