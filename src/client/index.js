import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
import routes from 'constants/routes'
import Main from 'containers/Main/'
// import makeStore from './store/configureStore'

// const store = makeStore({})

render(<BrowserRouter>
  <Main routes={routes} />
</BrowserRouter>, document.getElementById('root'))
