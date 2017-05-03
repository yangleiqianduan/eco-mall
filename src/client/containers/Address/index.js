import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Switch from 'components/Switch/'

@CSSModules(styles, { allowMultiple: true })
export class Address extends PureComponent {
  state = {
    isDefault: false
  }
  render () {
    return <div styleName='wrap'>
      <section styleName='panel'>
        收货地址详情
      </section>
      <section styleName='panel'>
        <div styleName='long'>设置为默认地址</div>
        <Switch value={this.state.isDefault} onChange={(v) => this.setState({isDefault: v})} />
      </section>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared
})

export default connect(mapStateToProps)(Address)
