import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, { allowMultiple: true })
export class AddressList extends PureComponent {
  render () {
    return <div styleName='wrap'>
      收货地址列表
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared
})

export default connect(mapStateToProps)(AddressList)
