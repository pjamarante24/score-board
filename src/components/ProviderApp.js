import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducers'
import thunk from 'redux-thunk'

const middleware = applyMiddleware(thunk)

export default function ProviderApp(props) {
  const store = createStore(reducer, props.state, middleware)

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}