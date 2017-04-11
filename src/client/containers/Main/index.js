import React, { PureComponent } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withRouter, Prompt } from 'react-router'
import { updateTitle } from 'common/utils'

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
    const { routes } = this.props
    return <div styleName='wrap'>
      <Redirect to='/item' />
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

export default withRouter(Main)
