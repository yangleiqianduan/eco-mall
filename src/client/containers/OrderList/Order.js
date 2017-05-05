import React, { PureComponent } from 'react'

import CSSModules from 'react-css-modules'
import styles from './Order.styl'
import classNames from 'classnames/bind'

import LabelItem from 'components/LabelItem/'
import { Link } from 'react-router-dom'

@CSSModules(styles, { allowMultiple: true })
export default class extends PureComponent {
  renderOperationList = (op, i) => {
    const { orderId } = this.props.data
    const { onCancel, onDelete } = this.props
    switch (op.code) {
      case 1:               // 待支付
        return <div key={i} styleName='btnArea dark'>付款</div>
      case 2:               // 取消订单
        return <div key={i} styleName='btnArea' onClick={() => onCancel(orderId)}>取消订单</div>
      // case 3:               // 查看物流
      //   return <div key={i} styleName='btnArea light'>追踪物流</div>
      case 3:
        return <div key={i} styleName='btnArea' onClick={() => onDelete(orderId)}>删除订单</div>
      case 4:
        return <div key={i} styleName='btnArea light'>退货</div>
    }
  }
  render () {
    const { itemsList, operationList, status, statusCode, orderId, totalAmount } = this.props.data
    const statusStyle = classNames('gray', {
      red: statusCode === 100,
      yollow: statusCode === 200,
      green: statusCode === 300
    })
    return <div styleName='wrap'>
      <section styleName='header'>
        <div>订单号：{orderId}</div>
        <div styleName={statusStyle}>{status}</div>
      </section>
      <section>
        <Link to={`/order?id=${orderId}`}>
          {itemsList.map((item, i) => <LabelItem vertical={false} data={item} key={i} />)}
        </Link>
      </section>
      <section styleName='footer'>
        <div styleName='priceArea'>合计:￥{totalAmount}</div>
        {
          operationList.reverse().map(this.renderOperationList)
        }
      </section>
    </div>
  }
}
