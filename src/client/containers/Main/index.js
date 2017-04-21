import React, { PureComponent } from 'react'
import { Route, Redirect, Miss } from 'react-router-dom'
import { withRouter, Prompt } from 'react-router'
import { connect } from 'react-redux'
import { updateTitle, parseQueryString } from 'common/utils'

import 'fe-reset'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import NavBar from 'components/NavBar/'
import Toast from 'components/Toast/'
import Loading from 'components/Loading/'

import { getCateoryList } from 'actions/'

// console.log(Miss, 'check miss')

@CSSModules(styles, { allowMultiple: true })
export class Main extends PureComponent {
  componentDidMount () {
    this.props.dispatch(getCateoryList())
    window.$ULOG.send('10000', {type: 'pv', page: 'home'})
  }
  componentWillMount () {
    const { location, routes } = this.props
    updateTitle(location, routes)
  }

  render () {
    console.log(this.props.shared.toJS(), 'sss')
    const { routes, location } = this.props
    const { transRoute, loading, toast } = this.props.shared.toJS()
    return <div styleName='wrap'>
      {
        transRoute.to
        ? <Redirect {...transRoute} />
        : null
      }
      {
        routes.map((route, i) => <Route key={i} {...route} location={Object.assign({}, location, {query: parseQueryString(location.search)})} />)
      }
      <div style={{position: 'fixed', bottom: 0, width: '100%', display: 'none'}}>
        <NavBar data={routes} />
      </div>
      {toast.show ? <Toast>{toast.text}</Toast> : null}
      {loading ? <Toast><Loading color='#ccc' /></Toast> : null}
      <Prompt message={(location) => updateTitle(location, routes)} />
    </div>
  }
}

export class InitPath extends PureComponent {
  render () {
    const location = this.props.location || window.location || {pathname: ''}
    console.log(location, 'ssssss')
    return <Redirect to='/' />
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.main
})

export default withRouter(connect(mapStateToProps)(Main))
