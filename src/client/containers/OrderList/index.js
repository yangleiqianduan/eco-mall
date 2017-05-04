import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import NavBar from 'components/NavBar/'
import ScrollList from 'components/ScrollList/'
import Order from './Order'

@CSSModules(styles, { allowMultiple: true })
export class OrderList extends PureComponent {
  state = {
    nav: [{title: '全部', status: '', replace: true}, {status: '1', title: '待付款', replace: true}, {status: '2', title: '待发货', replace: true}, {status: '3', title: '待收货', replace: true}]
  }
  render () {
    const { status = '' } = this.props.location.query
    const navData = this.state.nav.map(n => Object.assign(n, {path: n.status ? `/orderList?status=${n.status}` : '/orderList', active: n.status === status}))
    const orders = [
      {firstPageUrl: 'https://image1.ljcdn.com/lmall/93f2c612-f8c7-4cca-9952-ba0556d0ceed.jpg', text: '火山黑 1件', productName: '宜家组合布艺沙发', marketPrice: '2360'},
      {firstPageUrl: 'https://image1.ljcdn.com/lmall/93f2c612-f8c7-4cca-9952-ba0556d0ceed.jpg', text: '火山黑 1件', productName: '宜家组合布艺沙发', marketPrice: '2360'},
      {firstPageUrl: 'https://image1.ljcdn.com/lmall/93f2c612-f8c7-4cca-9952-ba0556d0ceed.jpg', text: '火山黑 1件', productName: '宜家组合布艺沙发', marketPrice: '2360'},
      {firstPageUrl: 'https://image1.ljcdn.com/lmall/93f2c612-f8c7-4cca-9952-ba0556d0ceed.jpg', text: '火山黑 1件', productName: '宜家组合布艺沙发', marketPrice: '2360'}
    ]
    return <div styleName='wrap'>
      <div styleName='nav'><NavBar data={navData} /></div>
      <ScrollList data={orders}
        renderItem={(item, i) => <Order key={i} data={item} />} />
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared
})

export default connect(mapStateToProps)(OrderList)
