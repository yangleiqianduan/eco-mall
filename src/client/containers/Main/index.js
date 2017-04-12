import React, { PureComponent } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withRouter, Prompt } from 'react-router'
import { connect } from 'react-redux'
import { updateTitle } from 'common/utils'

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
    console.log(this.props.shared.toJS(), 'sss')
    const { routes } = this.props
    const { transRoute } = this.props.shared.toJS()
    return <div styleName='wrap'>
      {
        transRoute.to
        ? <Redirect {...transRoute} />
        : null
      }
      <div>
        <NavBar data={routes} />
      </div>
      {
        routes.map((route, i) => <Route key={i} {...route} />)
      }
      <Prompt message={(location) => updateTitle(location, routes)} />
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.main
})

export default withRouter(connect(mapStateToProps)(Main))
