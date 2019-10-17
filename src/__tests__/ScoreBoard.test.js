import React from 'react'
import { cleanup } from '@testing-library/react'
import ScoreBoard from '../components/ScoreBoard'
import { renderConnectedComponent } from '../utils/test'
import { handleInitialData } from '../actions/shared'

afterEach(cleanup)

describe('score board table', () => {
  test('should present "Nobody has scored" if no one has scored', () => {
    const { getByTestId } = renderConnectedComponent(<ScoreBoard />)
    const scoreBoardBody = getByTestId("score-board-body")
    expect(scoreBoardBody.textContent).toEqual("Nobody has scored")
  })

  test('should have 3 or less players', async () => {
    const { getByTestId, dispatch } = renderConnectedComponent(<ScoreBoard />)
    dispatch(handleInitialData())
    const scoreBoardBody = getByTestId("score-board-body")
    expect(scoreBoardBody.children.length).toBeLessThanOrEqual(3)
  })
})


