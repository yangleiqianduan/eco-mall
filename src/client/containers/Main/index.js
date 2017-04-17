import React, { PureComponent } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withRouter, Prompt } from 'react-router'
import { connect } from 'react-redux'
import { updateTitle, parseQueryString } from 'common/utils'

// import {
//   changeRouter
// } from 'actions/'

import 'fe-reset'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import NavBar from 'components/NavBar/'

@CSSModules(styles, { allowMultiple: true })
export class Main extends PureComponent {
  // componentDidMount () {
  //   new Obersve(this.props.history)
  // }
  componentWillMount () {
    const { location, routes } = this.props
    updateTitle(location, routes)
  }

  render () {
    console.log(this.props, 'sss')
    const { routes, location } = this.props
    const { transRoute } = this.props.shared.toJS()
    return <div styleName='wrap'>
      {
        transRoute.to
        ? <Redirect {...transRoute} />
        : null
      }
      {
        routes.map((route, i) => <Route key={i} {...route} location={Object.assign({}, location, {query: parseQueryString(location.search)})} />)
      }
      <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
        
      </div>
      <Prompt message={(location) => updateTitle(location, routes)} />
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.main
})

export default withRouter(connect(mapStateToProps)(Main))
