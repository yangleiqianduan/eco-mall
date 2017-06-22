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

import { host, login } from 'constants/api'
import { isAndroid } from 'common/utils'

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
    if (window.confirm(`是否拨打电话：${servicePhoneNumber}`)) {
      if (window.IS_APP && isAndroid) {
        return window.nativeBridge.actionWithUrl(`lianjia://phonenum/customerservices?telephone=${servicePhoneNumber}`)
      }
      this.refs.tel.click()
    }
  }

  handleLogin = (e) => {
    if (window.IS_APP) {
      e.preventDefault()
      window.nativeBridge.actionLogin(window.location.href)
    } else {
      window.location.href = `${host[window.ENV]}${login}?ru=${encodeURIComponent(window.location)}`
    }
  }

  render () {
    const { userInfo, orderCount } = this.props.shared.toJS()
    const addressCount = (orderCount.filter(c => c.code === 1000)[0] || {}).count
    const navData = this.mapCountToOrder(nav, orderCount)
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
      <div><a href={`tel://${servicePhoneNumber}`} ref='tel'>客服1</a></div>
      <div><a href={`tel:${servicePhoneNumber}`} ref='tel'>客服2</a></div>
      <div onClick={() => window.nativeBridge.actionWithUrl(`lianjia://phonenum/customerservices?telephone=${servicePhoneNumber}`)}><a>客服3</a></div>
      <div onClick={() => window.nativeBridge.actionWithUrl(`lianjia://tel?agent_phone=${servicePhoneNumber}`)}><a>客服4</a></div>
      <div styleName='pannel' onClick={this.handleCall}>
        <div styleName='label last'>
          <div styleName='obvious'>联系客服</div>
          <div styleName='unObvious'>{servicePhoneNumber}<Icon width={14} icon='rightArrow' /></div>
        </div>
      </div>
      <a href={`tel://${servicePhoneNumber}`} ref='tel' />
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared
})

export default connect(mapStateToProps)(Mine)

const nav = [{status: '100', title: '待付款', icon: 'mattess'}, {status: '230', title: '待发货', icon: 'mattess'}, {status: '250', title: '待收货', icon: 'mattess'}]
