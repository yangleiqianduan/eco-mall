import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Switch from 'components/Switch/'
import Button from 'components/Button/'

@CSSModules(styles, { allowMultiple: true })
export class Address extends PureComponent {
  state = {
    isDefault: false
  }

  handleSubmit = () => {
    console.log(111)
  }

  render () {
    return <div styleName='wrap'>
      <section styleName='form'>
        <div styleName='info'>
          <span>收货人</span>
        </div>
        <div styleName='info'>
          <span>联系电话</span>
        </div>
        <div styleName='info'>
          <span>省份 城市 县区</span>
        </div>
        <div styleName='address'>
          <textarea placeholder='填写详细地址，不少于5个字' styleName='textarea'></textarea>
        </div>
      </section>
      <section styleName='panel'>
        <div styleName='long'>设置为默认地址</div>
        <Switch value={this.state.isDefault} onChange={(v) => this.setState({isDefault: v})} />
      </section>
      <div styleName='btnSave'>
        <Button onClick={ this.handleSubmit }>保存</Button>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared
})

export default connect(mapStateToProps)(Address)
