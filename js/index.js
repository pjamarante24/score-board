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
let scoreBoard = []

function addPlayer(e) {
    e.preventDefault()

    const target = e.target

    if (target.name.value === "" ||
        target.lastName.value === "") {
        alert('Please fill all the fields')
        return
    }

    let player = {
        id: players.length,
        name: target.name.value,
        lastName: target.lastName.value,
        position: target.position.value
    }

    target.name.value = ''
    target.lastName.value = ''

    players = players.concat(player)
}

function addScore(id, score) {
    let playerScore = scoreBoard.find((s) => s.id === id)

    if (playerScore) {
        playerScore.score += score
    } else {
        scoreBoard = scoreBoard.concat({
            id,
            score
        })
    }

    updateScoreBoard()
}

function updatePlayerList() {
    let playerList = document.getElementById('players')

    playerList.innerText = ''

    players.forEach(({ id, name, lastName, position }) => {
        var li = document.createElement('li')
        li.innerText = `${name} ${lastName}, ${position}`

        var addTwoPointsBtn = document.createElement('button')
        addTwoPointsBtn.innerText = "2"
        addTwoPointsBtn.addEventListener('click', () => addScore(id, 2))

        var addThreePointsBtn = document.createElement('button')
        addThreePointsBtn.innerText = "3"
        addThreePointsBtn.addEventListener('click', () => addScore(id, 3))

        li.appendChild(addTwoPointsBtn)
        li.appendChild(addThreePointsBtn)

        playerList.appendChild(li)
    })
}

function updateScoreBoard() {
    let scoreBoardTable = document.querySelector('#score-board tbody')
    const orderedScoreBoard = scoreBoard
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)

    scoreBoardTable.innerText = ''

    orderedScoreBoard.forEach(({ id, score }, index) => {
        const { name, lastName, position } = players[id]

        const tr = `
            <td>${index + 1}</td>
            <td>${score}</td>
            <td>${lastName}, ${name[0]}</td>
            <td>${position}</td>
        `
        scoreBoardTable.insertAdjacentHTML('beforeend', tr)

    })
}


document.getElementById("add-player").addEventListener('submit', (e) => {
    addPlayer(e)
    updatePlayerList()
})

updatePlayerList()