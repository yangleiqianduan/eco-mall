import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import * as actions from 'actions/logistics'

@CSSModules(styles, { allowMultiple: true })
export class Logistics extends PureComponent {

  componentDidMount() {
    const query = this.props.location.query
    this.props.dispatch(actions.getLogisticsList(query))
  }

  render () {
    const data = this.props.data.toJS() || {}

    return <div>追踪订单</div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.logistics
})

export default connect(mapStateToProps)(Logistics)
