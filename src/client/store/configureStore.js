import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import * as reducers from 'reducers'

const devtools = window.devToolsExtension || (() => noop => noop)

const rootReducer = combineReducers({
  ...reducers
})

let middlewares = [
  thunkMiddleware
]

if (window.ENV === 'dev') {
  let createLogger = require('redux-logger')
  middlewares.push(createLogger())
}

const enhancers = [
  applyMiddleware(...middlewares),
  devtools()
]

export default initState => {
  const store = createStore(
    rootReducer,
    initState,
    compose(...enhancers)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      System.import('../reducers').then((nextRootReducer) => {
        // store.replaceReducer(nextRootReducer)
        const rootReducer = nextRootReducer.default
        store.replaceReducer(rootReducer)
      })
    })
  }

  return store
}
