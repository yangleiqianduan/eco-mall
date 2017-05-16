import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Icon from 'components/Icons/'
import Button from 'components/Button/'
import Order from './Order'

import * as actions from 'actions/order'

import { payOrder } from 'constants/api'

@CSSModules(styles, { allowMultiple: true })
export class OrderList extends PureComponent {
  componentDidMount() {
    const query = this.props.location.query
    this.props.dispatch(actions.getOrderDetail(query))
  }

  handlePay = (id) => {
    window.location = `${payOrder}?order_id=${id}`
  }

  render () {
    const data = this.props.data.toJS() || {}
    const details = data.data
    const { payInfo, statusCode, receiverInfo, payOrderId } = details
    const isNeedPay = statusCode === 100

    return <div styleName={isNeedPay ? 'wrap wrap_pay' : 'wrap'}>
        <div styleName='orderInfo bgWhite'>
          <p>下单时间：<span>{details.createTime}</span></p>
          <p>订单编号：<span>{details.orderId}</span></p>
        </div>
        <div>
          <Order data={details} />
        </div>
        <div styleName="payInfo bgWhite">
          <div styleName="content">
            <p>{receiverInfo.receiverName}<span styleName="tel">{receiverInfo.phoneNum}</span></p>
            <p>{receiverInfo.addressDetail}</p>
          </div>
          {!isNeedPay
            ? <div>
                <div styleName="content">
                  <p>支付方式：<span>{payInfo.payMethod}</span></p>
                  <p>商品合计：<span>￥{payInfo.totalProductAmount}</span></p>
                  <p>运&emsp;&emsp;费：<span>￥{payInfo.totalTmsAmount}</span></p>
                </div>
                <div styleName="content">
                  <p>实&emsp;&emsp;付：<span styleName="red">￥{payInfo.payAmount}</span></p>
                </div>
              </div>
            : null
          }       
        </div>
        {
          isNeedPay
          ? <div>
              <div styleName="contect bgWhite">
                <p><Icon icon='listener' width="16"/><span>联系客服</span></p>
              </div>
              <div styleName='readyPay'>
                <div styleName='totalAmount common'>总计：<span>￥{payInfo.totalAmount}</span></div>
                <div styleName='goPay common' onClick={() => this.handlePay(payOrderId)}>去支付</div>
              </div>
            </div>
          : <div styleName='service'>
              <a href='tel:123'><Button>电话客服</Button></a>
            </div>
        }
      </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data:state.order
})

export default connect(mapStateToProps)(OrderList)
