import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Icon from 'components/Icons/'
import Button from 'components/Button/'
import Order from './Order'

import * as actions from 'actions/order'

@CSSModules(styles, { allowMultiple: true })
export class OrderList extends PureComponent {

  handlePay = () => {
    console.log(11111)
  }

  componentDidMount() {
    const query = this.props.location.query.order_id
    this.props.dispatch(actions.getOrderDetail(query))
  }

  render () {
    const data = this.props.data.toJS() || {}
    const details = data.data
    const { payInfo , statusCode } = details
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
            <p>美丽娜子<span styleName="tel">18612566861</span></p>
            <p styleName="address">北京市朝阳区菜市口C座198室</p>
          </div>
          {!isNeedPay
            ? <div>
                <div styleName="content">
                  <p>支付方式：<span>{payInfo.payMethod}</span></p>
                  <p>商品合计：<span>{'￥'+payInfo.totalProductAmount}</span></p>
                  <p>运&emsp;&emsp;费：<span>{'￥'+payInfo.totalTmsAmount}</span></p>
                </div>
                <div styleName="content">
                  <p>实&emsp;&emsp;付：<span styleName="red">{'￥'+payInfo.payAmount}</span></p>
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
                <div styleName='totalAmount common'>总计：<span>{'￥'+payInfo.totalAmount}</span></div>
                <div styleName='goPay common' onClick={() => this.handlePay()}>去支付</div>
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
