import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import { Link } from 'react-router-dom'
import Icon from 'components/Icons'
import NavBar from 'components/NavBar/'

import { servicePhoneNumber } from 'constants/text'
import { defaultAvatar } from 'constants/img'

import { getUserInfo, getOrderCount } from 'actions/'

@CSSModules(styles, { allowMultiple: true })
export class Mine extends PureComponent {
  componentDidMount () {
    this.props.dispatch(getUserInfo())
    this.props.dispatch(getOrderCount())
  }

  mapCountToOrder = (order, counts = []) => {
    return order.map(n => Object.assign(n, {path: `/orderList?status=${n.status}`, count: (counts.filter(c => c.code === parseInt(n.status))[0] || {count: 0}).count}))
  }

  render () {
    const { userInfo, orderCount } = this.props.shared.toJS()
    const navData = this.mapCountToOrder(nav, orderCount)
    return <div styleName='wrap'>
      <div styleName='board'>
        <div styleName='header'>
          <div styleName='name'>
            <div>{userInfo.displayName}</div>
            <div styleName='unObvious'>并不能编辑</div>
          </div>
          <div><img styleName='img' src={userInfo.avatar === 'https://image1.ljcdn.com' ? defaultAvatar : userInfo.avatar} /></div>
        </div>
        <div styleName='pannel'>
          <Link styleName='label' to='/orderList'>
            <div styleName='obvious'>我的订单</div>
            <div styleName='unObvious'>全部<Icon width={14} icon='rightArrow' /></div>
          </Link>
        </div>
        <div styleName='nav'><NavBar data={navData} /></div>
      </div>
      <div styleName='pannel'>
        <Link styleName='label' to='/addressList'>
          <div styleName='obvious'>地址管理</div>
          <div styleName='unObvious'>2<Icon width={14} icon='rightArrow' /></div>
        </Link>
      </div>
      <a styleName='pannel' href={`tel:${servicePhoneNumber}`}>
        <div styleName='label last'>
          <div styleName='obvious'>联系客服</div>
          <div styleName='unObvious'>{servicePhoneNumber}<Icon width={14} icon='rightArrow' /></div>
        </div>
      </a>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared
})

export default connect(mapStateToProps)(Mine)

const nav = [{status: '100', title: '待付款', icon: 'mattess'}, {status: '230', title: '待发货', icon: 'mattess'}, {status: '250', title: '待收货', icon: 'mattess'}]
