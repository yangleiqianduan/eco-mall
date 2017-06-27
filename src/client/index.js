import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from 'constants/routes'
import Main from 'containers/Main/'
import makeStore from './store/configureStore'

const store = makeStore({})

// 加载完jsBridge后在执行业务代码，保证请求cookie正确
$ljBridge.ready((bridge, webStatus) => {
  window.nativeBridge = bridge
  window.IS_APP = webStatus && webStatus.isApp

  render(<BrowserRouter>
    <Provider store={store}>
      <Main routes={routes} />
    </Provider>
  </BrowserRouter>, document.getElementById('root'))
})
