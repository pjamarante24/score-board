import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import Players from '../components/Players'
import { renderConnectedComponent } from '../utils/test'
import { handleInitialData } from '../actions/shared'

const props = {
  history: {
    push: jest.fn()
  }
}

afterEach(cleanup)

describe('players list', () => {
  test('should have 0 players', () => {
    const { getByTestId } = renderConnectedComponent(<Players {...props} />)
    const listNode = getByTestId('players-list')
    expect(listNode.children.length).toEqual(0)
  })

  test('should have 4 players', () => {
    const { getByTestId, dispatch } = renderConnectedComponent(<Players {...props} />)
    dispatch(handleInitialData())
    const listNode = getByTestId('players-list')
    expect(listNode.children.length).toEqual(4)
  })

  test('removing a player', () => {
    const { getByTestId, queryByTestId, dispatch } = renderConnectedComponent(<Players {...props} />)
    dispatch(handleInitialData())
    const listNode = getByTestId('players-list')
    const firstChild = listNode.children[0]

    fireEvent.click(firstChild)
    expect(firstChild.className).toMatch(/active/)
    expect(getByTestId('remove-button')).toBeTruthy()

    fireEvent.click(getByTestId('remove-button'))

    expect(listNode.children.length).toEqual(3)

    expect(queryByTestId('remove-button')).toBeFalsy()
  })

  test('editing a player', () => {
    const { getByTestId, queryByTestId, dispatch, store } = renderConnectedComponent(<Players {...props} />)
    dispatch(handleInitialData())

    const listNode = getByTestId('players-list')
    const firstChild = listNode.children[0]

    fireEvent.click(firstChild)
    expect(firstChild.className).toMatch(/active/)
    expect(getByTestId('edit-button')).toBeTruthy()

    fireEvent.click(getByTestId('edit-button'))

    const { players } = store.getState()
    expect(props.history.push).toHaveBeenCalledWith(`/edit-player/${players[0].id}`)

    expect(firstChild.className).not.toMatch(/active/)
    expect(queryByTestId('edit-button')).toBeFalsy()
  })
})