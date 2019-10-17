import React from 'react'
import { render, fireEvent, getByLabelText, getByText } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'

export const player = {
  name: "Kevin",
  lastName: "Durant",
  position: "PF"
}

export function renderConnectedComponent(ui, reducer = reducers) {
  const store = createStore(reducer, applyMiddleware(thunk))

  return {
    ...render(
      <Provider store={store}>
        {ui}
      </Provider>
    ),
    dispatch: store.dispatch,
    store,
    typing
  }
}

export function typing(input, value) {
  fireEvent.change(input, { target: { value } })
}

export function submitPlayerForm(container, player, submitButtonText = "Add") {
  const name = getByLabelText(container, 'Name :')
  const lastName = getByLabelText(container, 'Last Name :')
  const position = getByLabelText(container, 'Position :')
  const submit = getByText(container, submitButtonText)

  typing(name, player.name)
  typing(lastName, player.lastName)
  typing(position, player.position)

  fireEvent.click(submit)
}
