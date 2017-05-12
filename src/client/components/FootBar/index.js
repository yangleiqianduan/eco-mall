import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'
import { servicePhoneNumber } from 'constants/text'

import Icon from 'components/Icons'
import { Link } from 'react-router-dom'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    const { onBuy, onAdd, cartCount } = this.props
    return <div styleName='wrap'>
      <div styleName='content'>
        <div styleName='icons'>
          <div styleName='item'>
            <a href={`tel:${servicePhoneNumber}`}><Icon icon='listener' width={18} stroke='#FFF' /></a>
          </div>
          <Link styleName='item cart' to='/shoppingcart'>
            <Icon icon='cart' width={18} stroke='#FFF' />
            {
              cartCount > 0
              ? <em>{cartCount}</em>
              : null
            }
          </Link>
        </div>
        <div styleName='buyArea'>
          <div styleName='addCart' onClick={onAdd}>
            加入购物车
          </div>
          <div styleName='buy' onClick={onBuy}>
            立即购买
          </div>
        </div>
      </div>
    </div>
  }
}
