import React from 'react'
import AddPlayer from '../components/AddPlayer'
import { fireEvent, cleanup } from '@testing-library/react'
import { renderConnectedComponent, submitPlayerForm, player } from '../utils/test'
import { handleInitialData } from '../actions/shared'

afterEach(cleanup)

window.alert = jest.fn()

const props = {
  history: {
    push: jest.fn()
  }
}

describe('player form', () => {
  test('validating data', () => {
    const { getByLabelText, getByText, typing } = renderConnectedComponent(<AddPlayer {...props} />)

    const name = getByLabelText('Name :')
    const lastName = getByLabelText('Last Name :')
    const submit = getByText('Add')

    fireEvent.click(submit)
    expect(window.alert).toHaveBeenCalledTimes(1)
    expect(window.alert).toHaveBeenCalledWith('Please fill all the fields')

    typing(name, player.name)
    fireEvent.click(submit)
    expect(window.alert).toHaveBeenCalledTimes(2)
    expect(window.alert).toHaveBeenCalledWith('Please fill all the fields')

    typing(lastName, player.lastName)
    fireEvent.click(submit)
    expect(window.alert).not.toHaveBeenCalledTimes(3)
    expect(props.history.push).toHaveBeenCalled()
  })


  test('adding player', () => {
    const { store, container } = renderConnectedComponent(<AddPlayer {...props} />)
    const { players } = store.getState()

    submitPlayerForm(container, player)

    expect(props.history.push).toHaveBeenCalledWith("/players")
    expect(store.getState().players.length).toEqual(players.length + 1)
  })

  test('editing a player', () => {
    props.match = {
      params: {
        id: 2
      }
    }

    const { dispatch, store, container } = renderConnectedComponent(<AddPlayer {...props} />)
    dispatch(handleInitialData())

    submitPlayerForm(container, player, "Edit")

    const newPlayer = store.getState().players[props.match.params.id]
    expect(newPlayer.name).toEqual(player.name)
    expect(newPlayer.lastName).toEqual(player.lastName)
    expect(newPlayer.position).toEqual(player.position)
    expect(props.history.push).toHaveBeenCalledWith("/players")
  })
})




