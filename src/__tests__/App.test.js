import React from 'react'
import { renderConnectedComponent, submitPlayerForm, player } from '../utils/test'
import App from '../components/App'
import { fireEvent, waitForElement } from '@testing-library/dom'
import { cleanup } from '@testing-library/react'

afterEach(cleanup)

const fullname = `${player.name} ${player.lastName}`

test('routing', async () => {
  const { getByText, getAllByText } = renderConnectedComponent(<App />)

  const playersNode = getByText('Players')
  fireEvent.click(playersNode)
  expect(window.location.href).toMatch(/players/i)
  await waitForElement(() => getAllByText('Players'))
  expect(getAllByText('Players').length).toEqual(2)

  const addPlayerNode = getByText('Add Player')
  fireEvent.click(addPlayerNode)
  expect(window.location.href).toMatch(/add-player/i)
  await waitForElement(() => getAllByText('Add Player'))
  expect(getAllByText('Add Player').length).toEqual(2)
})


test('adding player and adding score', () => {
  const { container, getByTestId, getByText } = renderConnectedComponent(<App />)
  submitPlayerForm(container, player)
  expect(getByTestId('players-list').textContent).toMatch(fullname)
  fireEvent.click(getByText("Score Board"))
  fireEvent.change(getByTestId("search-input"), { target: { value: fullname } })
  fireEvent.click(getByText('+2pts'))
  expect(getByTestId("score-board-body").textContent).not.toMatch(`${player.lastName}, ${player.name[0]}`)
  fireEvent.click(getByText('+3pts'))
  expect(getByTestId("score-board-body").textContent).toMatch(`${player.lastName}, ${player.name[0]}`)
})

test('editing player with score', () => {
  const { container, getByTestId, getByText } = renderConnectedComponent(<App />)
  fireEvent.click(getByText("Add Player"))
  submitPlayerForm(container, player)
  fireEvent.click(getByText("Score Board"))
  fireEvent.change(getByTestId("search-input"), { target: { value: fullname } })
  fireEvent.click(getByText('+2pts'))
  expect(getByTestId("score-board-body").textContent).not.toMatch(`${player.lastName}, ${player.name[0]}`)
  fireEvent.click(getByText('+3pts'))
  expect(getByTestId("score-board-body").textContent).toMatch(`${player.lastName}, ${player.name[0]}`)
  fireEvent.click(getByText('Players'))
  fireEvent.click(getByText(RegExp(fullname)))
  fireEvent.click(getByTestId('edit-button'))
  expect(window.location.href).toMatch("/edit-player")
  const anotherPlayer = {
    ...player,
    lastName: "Garnett"
  }
  submitPlayerForm(container, anotherPlayer, "Edit")
  expect(getByTestId('players-list').textContent).toMatch(`${anotherPlayer.name} ${anotherPlayer.lastName}`)
  fireEvent.click(getByText("Score Board"))
  expect(getByTestId("score-board-body").textContent).toMatch(`${anotherPlayer.lastName}, ${anotherPlayer.name[0]}`)
})

test('deleting player with score', () => {
  const { container, getByTestId, getByText } = renderConnectedComponent(<App />)
  fireEvent.click(getByText("Add Player"))
  submitPlayerForm(container, player)
  fireEvent.click(getByText("Score Board"))
  fireEvent.change(getByTestId("search-input"), { target: { value: fullname } })
  fireEvent.click(getByText('+2pts'))
  expect(getByTestId("score-board-body").textContent).not.toMatch(`${player.lastName}, ${player.name[0]}`)
  fireEvent.click(getByText('+3pts'))
  expect(getByTestId("score-board-body").textContent).toMatch(`${player.lastName}, ${player.name[0]}`)
  fireEvent.click(getByText('Players'))
  fireEvent.click(getByText(RegExp(fullname)))
  fireEvent.click(getByTestId('remove-button'))
  expect(getByTestId('players-list').textContent).not.toMatch(fullname)
  fireEvent.click(getByText("Score Board"))
  expect(getByTestId("score-board-body").textContent).not.toMatch(`${player.lastName}, ${player.name[0]}`)
})





