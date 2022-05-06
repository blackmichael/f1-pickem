import {List} from 'immutable';

const leagueSummaries = [
  {
    id: '1',
    name: 'Fast Boiz',
    members: 8,
    season: '2021',
    resource: '/leagues/1',
  },
  {
    id: '2',
    name: 'Ricciardo Fan Club',
    members: 4,
    season: '2022',
    resource: '/leagues/2',
  },
  {
    id: '3',
    name: 'Drive To Survive',
    members: 10,
    season: '2017',
    resource: '/leagues/3',
  },
];

const races = List([
  {
    id: '20221',
    name: 'Bahrain Grand Prix',
    winners: ['John Becker'],
    date: '2022-03-20',
  },
  {
    id: '20222',
    name: 'Saudi Arabian Grand Prix',
    winners: ['Gus Horner'],
    date: '2022-03-27',
  },
  {
    id: '20223',
    name: 'Australian Grand Prix',
    winners: [],
    date: '2022-04-10',
  },
  {
    id: '20224',
    name: 'Emilia Romagna Grand Prix',
    winners: [],
    date: '2022-04-24',
  },
  {
    id: "20225",
    name: "Miami Grand Prix",
    winners: [],
    date: "2022-05-08"
  },
  {
    id: '20230101',
    name: 'TEST RACE',
    winners: ['f1pickem.com'],
    date: '2023-01-01',
  },
]);

export function getRaceById(id) {
  return races.find((race) => race.id === id);
}

const users = List([
  {
    id: '1',
    email: 'michaelpblack16@gmail.com',
    display_name: 'Black',
  },
  {
    id: '2',
    email: 'hornergus@gmail.com',
    display_name: 'Goose',
  },
  {
    id: '3',
    email: 'j.kelly.russ@gmail.com',
    display_name: 'Jun',
  },
  {
    id: '4',
    email: 'kmannuz49@gmail.com',
    display_name: 'Ken',
  },
  {
    id: '5',
    email: 'charlie.mullen12@gmail.com',
    display_name: 'Chuck',
  },
  {
    id: '6',
    email: 'tjfoley112358@gmail.com',
    display_name: 'Foley',
  },
  {
    id: '7',
    email: 'gontarek93@gmail.com',
    display_name: 'r333d',
  },
  {
    id: '8',
    email: 'john.becker94@gmail.com',
    display_name: 'J3P0',
  },
  {
    id: '9',
    email: 'nicholas.f.sommer@gmail.com',
    display_name: 'Nick',
  },
  {
    id: '10',
    email: 'johntosberg@gmail.com',
    display_name: 'Josberg',
  },
  {
    id: '11',
    email: 'tarekfmarei@gmail.com',
    display_name: 'Tarek',
  },
]);

export function getUserByEmail(email) {
  return users.find((user) => user.email === email);
}

export function getUserById(id) {
  return users.find((user) => user.id === id);
}

export function getRaces() {
  return races;
}

const defaultLeague = {
  id: '1',
  name: 'Fast Boiz',
  season: '2021',
  members: [
    'John Osberg',
    'Reed Gontarek',
    'John Becker',
    'Gus Horner',
    'John Russ',
    'Chuck Mullen',
    'Nick Sommer',
    'Michael Black',
  ],
  scores: [
    {
      name: 'John Osberg',
      score: 546,
    },
    {
      name: 'Reed Gontarek',
      score: 638,
    },
    {
      name: 'John Becker',
      score: 777,
    },
    {
      name: 'Gus Horner',
      score: 703,
    },
    {
      name: 'John Russ',
      score: 612,
    },
    {
      name: 'Chuck Mullen',
      score: 612,
    },
    {
      name: 'Nick Sommer',
      score: 579,
    },
    {
      name: 'Michael Black',
      score: 678,
    },
  ],
  scoreboard: {
    'John Osberg': 546,
    'Reed Gontarek': 638,
    'John Becker': 777,
    'Gus Horner': 703,
    'John Russ': 564,
    'Chuck Mullen': 612,
    'Nick Sommer': 579,
    'Michael Black': 678,
  },
  races: races,
};

const leagueDetails = {
  1: defaultLeague,
  2: defaultLeague,
  3: defaultLeague,
};

export function getLeagueSummary(id) {
  return leagueSummaries.find((ls) => ls.id === id);
}

export function getLeague(id) {
  return leagueDetails[id];
}

const defaultRace = {
  name: 'Azerbaijan Grand Prix',
  results: [
    'Max Verstappen',
    'Lando Norris',
    'Lewis Hamilton',
    'Carlos Sainz',
    'Valtteri Bottas',
    'Daniel Ricciardo',
    'Yuki Tsunoda',
    'Lance Stroll',
    'Pierre Gasly',
    'Sergio Perez',
    'Esteban Ocon',
    'Charles Leclerc',
    'Antonio Giovinazzi',
    'Sebastian Vettel',
    'Fernando Alonso',
    'Kimi Räikkönen',
    'George Russell',
    'Mick Schumacher',
    'Nicholas Latifi',
    'Nikita Mazepin',
  ],
};

export function getRace(id) {
  return defaultRace;
}

const driversList = List([
  'Max Verstappen',
  'Sergio Perez',
  'Lewis Hamilton',
  'George Russell',
  'Carlos Sainz',
  'Charles Leclerc',
  'Lando Norris',
  'Daniel Ricciardo',
  'Yuki Tsunoda',
  'Pierre Gasly',
  'Esteban Ocon',
  'Fernando Alonso',
  'Lance Stroll',
  'Sebastian Vettel',
  'Valtteri Bottas',
  'Zhou Guanyu',
  'Mick Schumacher',
  'Kevin Magnussen',
  'Nicholas Latifi',
  'Alexander Albon',
  'Nico Hulkenberg',
]);

export function getDrivers() {
  return driversList;
}

const defaultPicks = {
  all_picks: [
    {
      name: 'Michael Black',
      picks: [
        'Max Verstappen',
        'Lando Norris',
        'Lewis Hamilton',
        'Carlos Sainz',
        'Valtteri Bottas',
        'Daniel Ricciardo',
        'Yuki Tsunoda',
        'Lance Stroll',
        'Pierre Gasly',
        'Sergio Perez',
        'Esteban Ocon',
        'Charles Leclerc',
        'Antonio Giovinazzi',
        'Sebastian Vettel',
        'Fernando Alonso',
        'Kimi Räikkönen',
        'George Russell',
        'Mick Schumacher',
        'Nicholas Latifi',
        'Nikita Mazepin',
      ],
    },
    {
      name: 'John Osberg',
      picks: driversList.sort((a, b) => 0.5 - Math.random()),
    },
    {
      name: 'John Becker',
      picks: driversList.sort((a, b) => 0.5 - Math.random()),
    },
    {
      name: 'Gus Horner',
      picks: driversList.sort((a, b) => 0.5 - Math.random()),
    },
    {
      name: 'Reed Gontarek',
      picks: driversList.sort((a, b) => 0.5 - Math.random()),
    },
    {
      name: 'John Russ',
      picks: driversList.sort((a, b) => 0.5 - Math.random()),
    },
    {
      name: 'Chuck Mullen',
      picks: driversList.sort((a, b) => 0.5 - Math.random()),
    },
    {
      name: 'Nick Sommer',
      picks: driversList.sort((a, b) => 0.5 - Math.random()),
    },
  ],
};

export function getPicks(leagueId, raceId) {
  return defaultPicks;
}
