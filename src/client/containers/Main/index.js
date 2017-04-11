import React, { PureComponent } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withRouter, Prompt } from 'react-router'
import { connect } from 'react-redux'
import { updateTitle } from 'common/utils'

import {
  changeRouter
} from 'actions/'

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
      <Redirect to='/item' />
      {
        transRoute.to
        ? <Redirect {...transRoute} />
        : null
      }
      <div>
        <a onClick={() => this.props.dispatch(changeRouter('/'))}>111</a>
        <a onClick={() => this.props.dispatch(changeRouter('/item'))}>222</a>
        <a onClick={() => this.props.dispatch(changeRouter('/search'))}>333</a>
      </div>
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

export default connect(mapStateToProps)(withRouter(Main))
