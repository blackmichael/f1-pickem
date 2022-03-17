const leagueSummaries = [
    {
        "id": "1",
        "name": "Fast Boiz",
        "members": 8,
        "season": "2021",
        "resource": "/leagues/1"
    },
    {
        "id": "2",
        "name": "Ricciardo Fan Club",
        "members": 4,
        "season": "2022",
        "resource": "/leagues/2"
    },
    {
        "id": "3",
        "name": "Drive To Survive",
        "members": 10,
        "season": "2017",
        "resource": "/leagues/3"
    }
];

const defaultLeague = {
    "id": "1",
    "name": "Fast Boiz",
    "season": "2021",
    "members": [
        "John Osberg",
        "Reed Gontarek",
        "John Becker",
        "Gus Horner",
        "John Russ",
        "Chuck Mullen",
        "Nick Sommer",
        "Michael Black"
    ],
    "scores": [
        {
            "name": "John Osberg",
            "score": 546
        },
        {
            "name": "Reed Gontarek",
            "score": 638
        },
        {
            "name": "John Becker",
            "score": 777
        },
        {
            "name": "Gus Horner",
            "score": 703
        },
        {
            "name": "John Russ",
            "score": 612
        },
        {
            "name": "Chuck Mullen",
            "score": 612
        },
        {
            "name": "Nick Sommer",
            "score": 579
        },
        {
            "name": "Michael Black",
            "score": 678
        }
    ],
    "scoreboard": {
        "John Osberg": 546,
        "Reed Gontarek": 638,
        "John Becker": 777,
        "Gus Horner": 703,
        "John Russ": 564,
        "Chuck Mullen": 612,
        "Nick Sommer": 579,
        "Michael Black": 678
    },
    "races": [
        {
            "id": "20220320",
            "name": "Bahrain Grand Prix",
            "winners": ["tbd"],
            "date": "2022-03-20"
        },
        {
            "id": "20220327",
            "name": "Saudi Arabian Grand Prix",
            "winners": ["tbd"],
            "date": "2022-03-27"
        },
        {
            "id": "20220410",
            "name": "Australian Grand Prix",
            "winners": ["tbd", "tbd"],
            "date": "2022-04-10"
        }
    ]
}

const leagueDetails = {
    "1": defaultLeague,
    "2": defaultLeague,
    "3": defaultLeague
}

export function getLeagues() {
    return leagueSummaries;
}

export function getLeagueSummary(id) {
    return leagueSummaries.find((ls) => ls.id === id)
}

export function getLeague(id) {
    return leagueDetails[id];
}

const defaultRace = {
    "name": "Azerbaijan Grand Prix",
    "results": [
        "Max Verstappen",
        "Lando Norris",
        "Lewis Hamilton",
        "Carlos Sainz",
        "Valtteri Bottas",
        "Daniel Ricciardo",
        "Yuki Tsunoda",
        "Lance Stroll",
        "Pierre Gasly",
        "Sergio Perez",
        "Esteban Ocon",
        "Charles Leclerc",
        "Antonio Giovinazzi",
        "Sebastian Vettel",
        "Fernando Alonso",
        "Kimi Räikkönen",
        "George Russell",
        "Mick Schumacher",
        "Nicholas Latifi",
        "Nikita Mazepin"
    ]
}

export function getRace(id) {
    return defaultRace
}

const driversList = [
    "Max Verstappen",
    "Lando Norris",
    "Lewis Hamilton",
    "Carlos Sainz",
    "Valtteri Bottas",
    "Daniel Ricciardo",
    "Yuki Tsunoda",
    "Lance Stroll",
    "Pierre Gasly",
    "Sergio Perez",
    "Esteban Ocon",
    "Charles Leclerc",
    "Antonio Giovinazzi",
    "Sebastian Vettel",
    "Fernando Alonso",
    "Kimi Räikkönen",
    "George Russell",
    "Mick Schumacher",
    "Nicholas Latifi",
    "Nikita Mazepin"
];

export function getDrivers() {
    return driversList
}

const defaultPicks = {
    "all_picks": [
        {
            "name": "Michael Black",
            "picks": [
                "Max Verstappen",
                "Lando Norris",
                "Lewis Hamilton",
                "Carlos Sainz",
                "Valtteri Bottas",
                "Daniel Ricciardo",
                "Yuki Tsunoda",
                "Lance Stroll",
                "Pierre Gasly",
                "Sergio Perez",
                "Esteban Ocon",
                "Charles Leclerc",
                "Antonio Giovinazzi",
                "Sebastian Vettel",
                "Fernando Alonso",
                "Kimi Räikkönen",
                "George Russell",
                "Mick Schumacher",
                "Nicholas Latifi",
                "Nikita Mazepin"
            ]
        },
        {
            "name": "John Osberg",
            "picks": driversList.sort((a, b) => 0.5 - Math.random() )
        },
        {
            "name": "John Becker",
            "picks": driversList.sort((a, b) => 0.5 - Math.random() )
        },
        {
            "name": "Gus Horner",
            "picks": driversList.sort((a, b) => 0.5 - Math.random() )
        },
        {
            "name": "Reed Gontarek",
            "picks": driversList.sort((a, b) => 0.5 - Math.random() )
        },
        {
            "name": "John Russ",
            "picks": driversList.sort((a, b) => 0.5 - Math.random() )
        },
        {
            "name": "Chuck Mullen",
            "picks": driversList.sort((a, b) => 0.5 - Math.random() )
        },
        {
            "name": "Nick Sommer",
            "picks": driversList.sort((a, b) => 0.5 - Math.random() )
        }
    ]
}

export function getPicks(leagueId, raceId) {
    return defaultPicks
}