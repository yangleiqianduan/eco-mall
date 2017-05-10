import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Icon from 'components/Icons/'
import Order from './Order'

import * as actions from 'actions/order'

@CSSModules(styles, { allowMultiple: true })
export class OrderList extends PureComponent {
  componentDidMount() {
    const query = this.props.location.query.order_id
    this.props.dispatch(actions.getOrderDetail(query))
  }
  render () {
    const data = this.props.data.toJS() || {}
    
    const { payInfo } = data
    console.log(data,'+++++++++')
    console.log(payInfo,'========')
    return <div styleName='wrap'>
        {/* <Icon icon='listener' /> */}
        <div styleName='orderInfo bgWhite'>
          <p>下单时间：<span>{data.createTime}</span></p>
          <p>订单编号：<span>{data.orderId}</span></p>
        </div>
        <div>
          <Order data={data} />
        </div>
        <div styleName="payInfo bgWhite">
          <div styleName="content">
            <p>美丽娜子<span styleName="tel">18612566861</span></p>
            <p styleName="address">北京市朝阳区菜市口C座198室</p>
          </div>
          {
            payInfo
            ? <div styleName="content">
                <p>支付方式：<span>{payInfo.payMethod}</span></p>
                <p>商品合计：<span>{payInfo.totalProductAmount}</span></p>
                <p>运&emsp;&emsp;费：<span>{payInfo.totalTmsAmount}</span></p>
              </div>
            : null
          }
          {
            payInfo
            ? <div styleName="content">
                <p>实&emsp;&emsp;付：<span styleName="red">{payInfo.payAmount}</span></p>
              </div>
            : null
          }
        </div>
      </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data:state.order
})

export default connect(mapStateToProps)(OrderList)
