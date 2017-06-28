import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { alert } from 'actions/'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
import { servicePhoneNumber } from 'constants/text'
import Icon from 'components/Icons/'
// import Button from 'components/Button/'
import Order from './Order'

import * as actions from 'actions/order'
import { changeRouter } from 'actions/'

import { payOrder } from 'constants/api'

import { formatTime, phoneCall } from 'common/utils'

@CSSModules(styles, { allowMultiple: true })
export class OrderList extends PureComponent {
  componentDidMount () {
    const query = this.props.location.query
    this.props.dispatch(actions.getOrderDetail(query))
  }
  confirmTel = (e, txt) => {
    e.stopPropagation()
    phoneCall(servicePhoneNumber, txt)
    // this.props.dispatch(alert({
    //   text: '是否拨打电话：010-58104869',
    //   type: 'confirm',
    //   sureText: '致电',
    //   onSure: () => {
    //     this.refs.tel.click();
    //     this.props.dispatch(alert({
    //       show: false,
    //       sureText: '确定'
    //     }))
    //   }
    // }))
  }
  handlePay = (id) => {
    window.location = `${payOrder}?order_id=${id}`
  }
  handleCancel = (id, query) => {
    if (window.confirm('确认取消该订单？')) this.props.dispatch(actions.cancelOrder(id, query))
  }
  handleCancelAfterPay = (id) => {
    this.props.dispatch(changeRouter('/cancelOrder?order_id='+id))
  }
  handleDelete = (id) => {
    if (window.confirm('确认删除该订单')) this.props.dispatch(actions.deleteOrder(id, this.props.location.query.status || ''))
  }
  // handleEvaluate = () => {
    
  // }
  // handleReceive = () => {
    
  // }
  // handleTrace = (id) => {
  //   this.props.dispatch(changeRouter('/logistics?order_id='+id))
  // }

  renderOperationList = (op, i) => {
    const data = this.props.data.toJS() || {}
    const { payOrderId, orderId } = data.data
    switch (op.code) {
      case 1:              
        return <div key={i} styleName='btnArea toPay' onClick={() => this.handlePay(payOrderId)} >去支付</div>
      case 2:             
        return <div key={i} styleName='btnArea' onClick={() => this.handleCancel(orderId, this.props.location.query)} >取消订单</div>
      case 3:             
        return <div key={i} styleName='btnArea' onClick={() => this.handleDelete(orderId)} >删除订单</div>
      case 4:             
        return <div key={i} styleName='btnArea' onClick={(e) => this.confirmTel(e)} >申请售后</div>
      // case 5:             
      //   return <div key={i} styleName='btnArea' onClick={() => this.handleEvaluate(orderId)} >评价订单</div>
      case 6:             
        return <div key={i} styleName='btnArea' onClick={(e) => this.confirmTel(e)} >售后申请中</div>
      // case 7:             
      //   return <div key={i} styleName='btnArea' onClick={() => this.handleReceive(orderId)} >确认收货</div>
      case 8:             
        return <div key={i} styleName='btnArea' onClick={() => this.confirmTel(e)} >追踪物流</div>
      case 9:             
        return <div key={i} styleName='btnArea' onClick={() => this.handleCancelAfterPay(orderId)} >取消订单</div>
      case 10:
        return <div key={i} styleName='btnArea' onClick={(e) => this.confirmTel(e, '联系客服，查看取消进度')}>取消进度</div>
    }
  }

  render () {
    const data = this.props.data.toJS() || {}
    const details = data.data
    const { payInfo, statusCode, receiverInfo, payOrderId, operationList } = details
    const isNeedPay = statusCode === 100

    return <div styleName={isNeedPay ? 'wrap wrap_pay' : 'wrap'}>
        <div styleName='orderInfo bgWhite'>
          <p>下单时间：<span>{formatTime(details.createTime)}</span></p>
          <p>订单编号：<span>{details.orderId}</span></p>
        </div>
        <div>
          <Order data={details} changeRouter={(path) => this.props.dispatch(changeRouter(path))} />
        </div>
        <div styleName="payInfo bgWhite">
          <div styleName="content">
            <p>收&nbsp;&nbsp;货&nbsp;&nbsp;人：<span>{receiverInfo.receiverName}</span><span styleName="tel">{receiverInfo.phoneNum}</span></p>
            <p>收货地址：<span>{receiverInfo.addressDetail}</span></p>
          </div>
          {!isNeedPay
            ? <div>
                <div styleName="content">
                  <p>支付方式：<span>{payInfo.payMethod}</span></p>
                  <p>商品合计：<span>￥{payInfo.totalProductAmount}</span></p>
                  <p>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：<span>￥{payInfo.totalTmsAmount}</span></p>
                  <p>实&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;付：<span styleName="red">￥{payInfo.payAmount}</span></p>
                </div>
              </div>
            : null
          }       
        </div>
        <div styleName='bottomBtnGroup'>
          <div styleName="contect bgWhite" onClick={(e) => this.confirmTel(e)}>
            <Icon icon='listener' width="16"/><span styleName='text'>联系客服</span>
          </div>
          { operationList.length
            ? <div styleName='readyPay'>
                <div styleName='btnGroup'>
                {
                  operationList.map(this.renderOperationList)
                }
                </div>
              </div>
            : null
          }
        </div>
        <a href={`tel://${servicePhoneNumber}`} ref='tel'></a>
      </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data:state.order
})

export default connect(mapStateToProps)(OrderList)
