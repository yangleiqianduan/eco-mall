import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, { allowMultiple: true })
export class OrderList extends PureComponent {
  render () {
    return <div styleName='wrap'>
      订单详情
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared
})

export default connect(mapStateToProps)(OrderList)
