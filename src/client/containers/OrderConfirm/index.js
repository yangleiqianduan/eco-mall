import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
// import classNames from 'classnames/bind'

import { getAddressList } from 'actions/addressList'
import { getConfirmList, submitOrder } from 'actions/orderConfirm'
import Address from './Address'
import LabelItem from 'components/LabelItem/'

@CSSModules(styles, { allowMultiple: true })
export class OrderConfirm extends PureComponent {
  componentDidMount () {
    let paramData = JSON.parse(this.props.location.query.param)
    this.props.dispatch(getAddressList())
    this.props.dispatch(getConfirmList(paramData))
  }
  getCurrentAddress = (list, choose) => {
    let item = {}
    if (list.length === 0) {
      return null
    }
    if (choose === -1) {
      item = list.filter(a => a.isDefault)[0]
    } else {
      item = list[choose]
    }
    return item
  }
  handleSubmitOrder = (data, currentAddress) => {
    this.props.dispatch(submitOrder(data, currentAddress))
  }
  render () {
    const {
      data,
      addressChoose             // 选择的收货地址, 为地址列表的index，-1表示未选择
    } = this.props.data.toJS()
    const addressList = this.props.addressList.toJS().list      // 收货地址列表
    const { itemsList, totalAmount } = data
    const currentAddress = this.getCurrentAddress(addressList, addressChoose)
    return <div styleName='wrap'>
      <section styleName='pannel'>
        <Address data={currentAddress} />
      </section>
      <section styleName='content pannel'>
        {itemsList.map((item, i) => <LabelItem vertical={false} data={item.itemInfo} key={i} noBorder={i === (itemsList.length - 1)} />)}
      </section>
      <section styleName='footer'>
        <div styleName='priceArea'>总计：￥{totalAmount}</div>
        <div styleName='buyArea' onClick={this.handleSubmitOrder.bind(this, data, currentAddress)}>提交订单</div>
      </section>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.orderConfirm,
  addressList: state.addressList
})

export default connect(mapStateToProps)(OrderConfirm)
