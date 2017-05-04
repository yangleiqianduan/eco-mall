import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import NavBar from 'components/NavBar/'

@CSSModules(styles, { allowMultiple: true })
export class OrderList extends PureComponent {
  state = {
    nav: [{title: '全部', status: '', replace: true}, {status: '1', title: '待付款', replace: true}, {status: '2', title: '待发货', replace: true}, {status: '3', title: '待收货', replace: true}]
  }
  render () {
    const { status = '' } = this.props.location.query
    const navData = this.state.nav.map(n => Object.assign(n, {path: n.status ? `/orderList?status=${n.status}` : '/orderList', active: n.status === status}))
    return <div styleName='wrap'>
      <div styleName='nav'><NavBar data={navData} /></div>
      订单列表
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared
})

export default connect(mapStateToProps)(OrderList)
