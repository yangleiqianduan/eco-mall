import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import { Link } from 'react-router-dom'
import Icon from 'components/Icons'
import NavBar from 'components/NavBar/'

import { servicePhoneNumber } from 'constants/text'
import { defaultAvatar } from 'constants/img'

import { getUserInfo, getOrderCount, changeRouter } from 'actions/'

import { host, login } from 'constants/api'
import { phoneCall } from 'common/utils'

@CSSModules(styles, { allowMultiple: true })
export class Mine extends PureComponent {
  componentDidMount () {
    this.props.dispatch(getUserInfo())
    this.props.dispatch(getOrderCount())
  }

  mapCountToOrder = (order, counts = []) => {
    return order.map(n => Object.assign(n, {path: `/orderList?status=${n.status}`, count: (counts.filter(c => c.code === parseInt(n.status))[0] || {count: 0}).count}))
  }

  handleCall = () => {
    phoneCall(servicePhoneNumber)
  }

  handleLogin = (e) => {
    if (window.IS_APP) {
      e.preventDefault()
      window.nativeBridge.actionLogin(window.location.href)
    } else {
      window.location.href = `${host[window.ENV]}${login}?ru=${encodeURIComponent(window.location)}`
    }
  }

  handleBack = () => {
    this.props.dispatch(changeRouter('/'))
  }

  render () {
    const { userInfo, orderCount } = this.props.shared.toJS()
    const addressCount = (orderCount.filter(c => c.code === 1000)[0] || {}).count
    const navData = this.mapCountToOrder(nav, orderCount)
    console.log(navData, 'sss')
    return <div styleName='wrap'>
      <div styleName='board'>
        <div styleName='header'>
          <div styleName='name'>
            <div>{userInfo.displayName}</div>
            {
              userInfo.unLogin ? <div styleName='unObvious' onClick={this.handleLogin}>点击登录</div> : null
            }
          </div>
          <div><img styleName='img' src={userInfo.avatar || defaultAvatar} /></div>
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
          <div styleName='unObvious'>{addressCount}<Icon width={14} icon='rightArrow' /></div>
        </Link>
      </div>
      <div styleName='pannel' onClick={this.handleCall}>
        <div styleName='label last'>
          <div styleName='obvious'>联系客服</div>
          <div styleName='unObvious'>{servicePhoneNumber}<Icon width={14} icon='rightArrow' /></div>
        </div>
      </div>
      <a href={`tel://${servicePhoneNumber}`} ref='tel' />
      <div styleName='backToHome' onClick={() => this.handleBack()}>返回首页</div>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared
})

export default connect(mapStateToProps)(Mine)

const nav = [{status: '100', title: '待付款', icon: 'obligation'}, {status: '230', title: '待发货', icon: 'waitForDeliving'}, {status: '250', title: '待收货', icon: 'waitForReceiving', iconWidth: 36}]
