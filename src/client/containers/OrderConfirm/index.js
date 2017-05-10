import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
// import classNames from 'classnames/bind'

import LabelItem from 'components/LabelItem/'

@CSSModules(styles, { allowMultiple: true })
export class OrderConfirm extends PureComponent {
  render () {
    const { data } = this.props.data.toJS()
    const { itemsList, orderId, totalAmount } = data
    return <div styleName='wrap'>
      <section styleName='header pannel'>
        <div>订单号：{orderId}</div>
        <div styleName={'red'}>待支付</div>
      </section>
      <section styleName='content pannel'>
        {itemsList.map((item, i) => <LabelItem vertical={false} data={item} key={i} noBorder={i === (itemsList.length - 1)} />)}
      </section>
      <section styleName='footer'>
        <div styleName='priceArea'>总计:￥{totalAmount}</div>
        <div>下单</div>
      </section>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.orderConfirm
})

export default connect(mapStateToProps)(OrderConfirm)
