import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'
import classNames from 'classnames/bind'
import Icon from 'components/Icons'
import { Link } from 'react-router-dom'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  renderFooter = () => {
    const { onBuy, onAdd, status } = this.props
    switch (status) {
      case 0:        // 可售卖
        return <div styleName='buyArea'>
          <div styleName='addCart' onClick={onAdd}>
            加入购物车
          </div>
          <div styleName='buy' onClick={onBuy}>
            立即购买
          </div>
        </div>
      case 1:
        return <div styleName='buyArea'>
          <div styleName='disabled'>
            <span>待审核</span>
          </div>
        </div>
      case 2:        // 已下架
        return <div styleName='buyArea'>
          <div styleName='disabled'>
            <span>已下架</span>
          </div>
        </div>
      case 30:       // 已售罄
        return <div styleName='buyArea'>
          <div styleName='disabled'>
            <span>已售罄</span>
          </div>
        </div>
      default:
        return <div styleName='buyArea'>
          <div styleName='addCart' onClick={onAdd}>
            加入购物车
          </div>
          <div styleName='buy' onClick={onBuy}>
            立即购买
          </div>
        </div>
    }
  }
  render () {
    const { cartCount, status } = this.props
    return <div styleName='wrap'>
      <div styleName='content'>
        <div styleName='icons'>
          <div styleName='item' onClick={(e) => this.props.confirmTel(e)}>
            <Icon icon='listener' width={18} stroke='#FFF' />
          </div>
          <Link styleName={classNames('item', 'cart', {noBoard: status !== 0})} to='/shoppingcart'>
            <Icon icon='cart' width={18} stroke='#FFF' />
            {
              cartCount > 0
              ? <em><span>{cartCount}</span></em>
              : null
            }
          </Link>
        </div>
        {this.renderFooter()}
      </div>
    </div>
  }
}
