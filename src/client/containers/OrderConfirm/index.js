import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
// import classNames from 'classnames/bind'

import { getAddressList } from 'actions/addressList'
import { getConfirmList, submitOrder } from 'actions/orderConfirm'
import Address from './Address'
import LabelItem from 'components/LabelItem/'
import Icon from 'components/Icons/'

import { servicePhoneNumber } from 'constants/text'
import { isAndroid, formatTime } from 'common/utils'

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
  handleCall = () => {
    if (window.confirm(`是否拨打电话：${servicePhoneNumber}`)) {
      this.refs.tel.click()
    }
  }
  handleSubmitOrder = (data, currentAddress) => {
    this.props.dispatch(submitOrder(data, currentAddress))
  }
  getLastDay = (list) => {
    let sortList = list.sort((x, y) => {
      if (x.presellSendDays < y.presellSendDays) {
        return 1
      }
      if (x.presellSendDays > y.presellSendDays) {
        return -1
      }
      return 0
    })
    return (sortList[0] || {itemInfo: {}}).itemInfo.presellSendDays
  }
  render () {
    const {
      data,
      addressChoose             // 选择的收货地址, 为地址列表的index，-1表示未选择
    } = this.props.data.toJS()
    const addressList = this.props.addressList.toJS().list      // 收货地址列表
    const { itemsList, totalAmount } = data

    // 预售商品
    const presellItem = itemsList.filter(item => item.itemInfo.presellStatus === 2)
    const isPresell = presellItem.length
    const presellTime = this.getLastDay(presellItem)

    const currentAddress = this.getCurrentAddress(addressList, addressChoose)
    return <div styleName='wrap'>
      <section styleName='pannel'>
        <Address data={currentAddress} />
      </section>
      <section styleName='content pannel'>
        {itemsList.map((item, i) => <LabelItem vertical={false} data={item.itemInfo} key={i} noBorder={i === (itemsList.length - 1)} />)}
      </section>
      {
        isPresell
        ? <section styleName='pannel sendTime'>
          <div styleName='preTime'>预计发货时间：{formatTime(presellTime, 'yyyy-MM-DD')}前</div>
          <div styleName='light'>温馨提示：发货前会与您电话确认送货时间。同一个订单会一起发货，如果想要发货周期短的先发货，可以分开下单</div>
        </section>
        : null
      }
      <section styleName='pannel service' onClick={this.handleCall} >
        <div styleName='long'>如何开发票</div>
        <div styleName='light'>{servicePhoneNumber}<Icon icon='right' width={14} /></div>
        <a href={`${window.IS_APP && isAndroid ? 'tel:' : 'tel://'}${servicePhoneNumber}`} ref='tel' />
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
