import React, { PureComponent, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Button from 'components/Button/'
import Icon from 'components/Icons'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    const { onBuy } = this.props
    return <div styleName='wrap'>
      <div styleName='content'>
        <div styleName='icons'>
          <div styleName='item'>
            <Icon icon = {'listener'} width={18} stroke = {'#FFF'}/>
          </div>
          <div styleName='item cart'>
            <Icon icon = {'cart'} width={18} stroke = {'#FFF'}/>
            <em>2</em>
          </div>
          <div styleName="item addCart">
            加入购物车
          </div>
        </div>
        <div styleName='buyArea'><Button bright onClick={onBuy}>立即预约</Button></div>
      </div>
    </div>
  }
}
