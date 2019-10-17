import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import Search from '../components/Search'
import { renderConnectedComponent } from '../utils/test'
import { handleInitialData } from '../actions/shared'

afterEach(cleanup)

describe('search list', () => {
  test('search results should be empty', () => {
    const { getByTestId } = renderConnectedComponent(<Search />)
    const resultsNode = getByTestId("search-results")

    expect(resultsNode.children.length).toEqual(0)
  })

  test('should match 2 players', () => {
    const { getByTestId, dispatch } = renderConnectedComponent(<Search />)
    dispatch(handleInitialData())

    const resultsNode = getByTestId("search-results")
    const inputNode = getByTestId("search-input")

    fireEvent.change(inputNode, { target: { value: 'j' } })
    expect(resultsNode.children.length).toEqual(2)
  })
})
