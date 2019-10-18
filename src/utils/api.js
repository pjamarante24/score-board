const url = 'http://localhost:3001'

const headers = {
  "Content-Type": "application/json"
}

export async function getInitialData() {
  const players = await getPlayers()
  const scoreboard = await getScoreBoard()

  return {
    players,
    scoreboard
  }
}

async function getPlayers() {
  return fetch(`${url}/players`)
    .then((value) => {
      return value.json()
    })
}

async function getScoreBoard() {
  return fetch(`${url}/scoreboard`)
    .then((value) => {
      return value.json()
    })
}

function addPlayer(player) {
  return fetch(`${url}/player`, {
    method: 'POST',
    headers,
    body: JSON.stringify(player)
  })
    .then(res => res.json())
}

function editPlayer(player) {
  return fetch(`${url}/player/${player.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(player)
  })
    .then(res => res.json())
}

function removePlayer(id) {
  return fetch(`${url}/player/${id}`, {
    method: 'DELETE'
  })
    .then(res => res)
}

function addScore(id, score) {
  return fetch(`${url}/score/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ score })
  })
    .then(res => res)
}

export default { addPlayer, editPlayer, removePlayer, addScore }