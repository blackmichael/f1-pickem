// Mock API service for demo mode
// This replaces real backend API calls with mock data responses
// Response formats match the actual backend API

import {
  mockUser,
  mockLeagues,
  mockRaces,
  mockDrivers,
  mockPicks,
  mockRaceResults,
  mockRaceScores,
  mockLeagueDetails
} from './mockData';

// Helper to simulate network delay
const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API implementation
export const mockApi = {
  // Get user's leagues
  // Backend returns: { leagues: [{ id, name, num_of_members, season }] }
  getLeagues: async (userId) => {
    await delay();
    const userLeagues = mockLeagues.filter(league => league.members.includes(userId));
    return {
      data: {
        leagues: userLeagues.map(league => ({
          id: league.id,
          name: league.name,
          num_of_members: league.members.length,
          season: league.season
        }))
      }
    };
  },

  // Create a new league
  // Backend returns: { league_id, invite_token }
  createLeague: async (leagueData) => {
    await delay();
    const leagueId = `league-${Date.now()}`;
    const inviteToken = `token-${Math.random().toString(36).substr(2, 9)}`;
    const newLeague = {
      id: leagueId,
      name: leagueData.name,
      season: leagueData.season,
      owner: leagueData.userId,
      members: [leagueData.userId],
      createdAt: new Date().toISOString(),
      inviteToken: inviteToken
    };
    mockLeagues.push(newLeague);
    return {
      data: {
        league_id: leagueId,
        invite_token: inviteToken
      }
    };
  },

  // Get league details
  // Backend returns league object with members array
  getLeagueDetails: async (leagueId) => {
    await delay();
    const league = mockLeagueDetails[leagueId];
    if (!league) {
      throw new Error('League not found');
    }
    return { data: league };
  },

  // Join a league with invite token
  joinLeague: async (token, userId) => {
    await delay();
    const league = mockLeagues.find(l => l.inviteToken === token);
    if (!league) {
      throw new Error('Invalid invite token');
    }
    if (!league.members.includes(userId)) {
      league.members.push(userId);
    }
    return { data: { success: true } };
  },

  // Get races for a season
  // Backend returns: { races: [{ season, race_number, id, race_name, race_date, start_time }] }
  getRaces: async (season) => {
    await delay();
    const seasonRaces = mockRaces.filter(race => race.season === season);
    return {
      data: {
        races: seasonRaces.map(race => ({
          season: race.season,
          race_number: race.round,
          id: `${race.season}-${race.round}`,
          race_name: race.raceName,
          race_date: race.date,
          start_time: new Date(`${race.date}T${race.time}`).toISOString()
        }))
      }
    };
  },

  // Submit race picks
  submitPicks: async (picksData) => {
    await delay();
    const key = `${picksData.season}-${picksData.round}`;
    if (!mockPicks[picksData.leagueId]) {
      mockPicks[picksData.leagueId] = {};
    }
    mockPicks[picksData.leagueId][key] = {
      ...picksData,
      submittedAt: new Date().toISOString()
    };
    return { data: { success: true } };
  },

  // Get user's picks for a race
  getPicks: async (leagueId, season, round) => {
    await delay();
    const key = `${season}-${round}`;
    const picks = mockPicks[leagueId]?.[key];
    if (!picks) {
      return { data: null };
    }
    return { data: picks };
  },

  // Get race results
  getRaceResults: async (season, round) => {
    await delay();
    const key = `${season}-${round}`;
    const results = mockRaceResults[key];
    if (!results) {
      return { data: null };
    }
    return { data: results };
  },

  // Get race scores for a league
  getRaceScores: async (leagueId, season, round) => {
    await delay();
    const key = `${leagueId}-${season}-${round}`;
    const scores = mockRaceScores[key];
    if (!scores) {
      return { data: null };
    }
    return { data: scores };
  },

  // Get available drivers (helper for picks form)
  getDrivers: async () => {
    await delay();
    return { data: mockDrivers };
  }
};

// Mock authentication functions
export const mockAuth = {
  // Get current authenticated user
  getCurrentUser: async () => {
    await delay();
    return mockUser;
  },

  // Sign in (always succeeds in demo mode)
  signIn: async (username, password) => {
    await delay();
    return mockUser;
  },

  // Sign out
  signOut: async () => {
    await delay();
    return true;
  },

  // Sign up (always succeeds in demo mode)
  signUp: async (username, password, attributes) => {
    await delay();
    return { user: mockUser };
  },

  // Confirm sign up
  confirmSignUp: async (username, code) => {
    await delay(500);
    return true;
  }
};