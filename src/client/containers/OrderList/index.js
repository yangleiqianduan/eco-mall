import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import NavBar from 'components/NavBar/'
import ScrollList from 'components/ScrollList/'
import Order from './Order'

import {
  getOrderList,
  cancelOrder,
  deleteOrder
} from 'actions/orderList'

@CSSModules(styles, { allowMultiple: true })
export class OrderList extends PureComponent {
  state = {
    nav: [{title: '全部', status: '', replace: true}, {status: '100', title: '待付款', replace: true}, {status: '230', title: '待发货', replace: true}, {status: '250', title: '待收货', replace: true}]
  }

  componentDidMount () {
    this.getOrderList()
    window.addEventListener('scroll', this.checkScrollBottom)
  }

  componentWillReceiveProps = (np) => {
    const ns = np.location.query.status
    const ts = this.props.location.query.status
    if (ts !== ns) {
      this.getOrderList({status: ns})
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.checkScrollBottom)
  }

  checkScrollBottom = (e) => {
    const { page } = this.props.data.toJS()
    const footerPosition = this.refs.footer.getBoundingClientRect()
    const clientHeight = document.body.clientHeight
    if (parseInt(footerPosition.bottom) <= clientHeight) {
      if (page.currentPage < page.totalPage) {
        this.getOrderList({current_page: page.currentPage + 1})
      }
    }
  }

  getOrderList = (param) => {
    const status = this.props.location.query.status || ''
    this.props.dispatch(getOrderList(Object.assign({status}, param)))
  }

  cancelOrder = (id, index) => {
    console.log(id)
    if (window.confirm('确认取消该订单？')) this.props.dispatch(cancelOrder(id, index))
  }

  deleteOrder = (id) => {
    if (window.confirm('确认删除该订单')) this.props.dispatch(deleteOrder(id, this.props.location.query.status || ''))
  }

  render () {
    const { status = '' } = this.props.location.query
    const navData = this.state.nav.map(n => Object.assign(n, {path: n.status ? `/orderList?status=${n.status}` : '/orderList', active: n.status === status}))
    const { orders, page } = this.props.data.toJS()
    return <div styleName='wrap'>
      <div styleName='nav'><NavBar data={navData} /></div>
      <div styleName='content'>
        <ScrollList data={orders}
          renderItem={(item, i) => <Order key={i} onCancel={(id) => this.cancelOrder(id, i)} onDelete={this.deleteOrder} data={item} />} />
      </div>
      <div styleName='bottom' ref='footer'>
        {page.currentPage < page.totalPage ? '加载中...' : (page.totalPage ? '没有更多了' : '暂无订单')}
        <div styleName='bottomHeight'></div>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.orderList
})

export default connect(mapStateToProps)(OrderList)
