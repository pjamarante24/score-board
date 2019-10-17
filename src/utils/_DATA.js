let players = [
    {
        id: 0,
        name: "Shaq",
        lastName: "O'Neal",
        position: "C",
    },
    {
        id: 1,
        name: "Kobe",
        lastName: "Bryant",
        position: "SG",
    },
    {
        id: 2,
        name: "Lebron",
        lastName: "James",
        position: "SF",
    },
    {
        id: 3,
        name: "Michael",
        lastName: "Jordan",
        position: "SG",
    }

]

let scoreboard = [
    {
        id: 0,
        score: 12
    },
    {
        id: 1,
        score: 4
    },
    {
        id: 2,
        score: 8
    }
]

export function _getPlayers() {
    return players;
}

export function _getScoreboard() {
    return scoreboard;
}