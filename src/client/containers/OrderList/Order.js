import React, { PureComponent } from 'react'

import CSSModules from 'react-css-modules'
import styles from './Order.styl'
import classNames from 'classnames/bind'

import LabelItem from 'components/LabelItem/'
import { Link } from 'react-router-dom'

import { payOrder, host } from 'constants/api'

@CSSModules(styles, { allowMultiple: true })
export default class extends PureComponent {
  state = {
    canPay: true,
    time: '00:00'
  }

  componentDidMount () {
    const { statusCode, countDown } = this.props.data
    if (statusCode === 100) {
      this.startCountDown(countDown)
    }
  }

  componentDidUpdate (prep) {
    const { statusCode, pCountDown: countDown } = this.props.data
    const { pCountDown } = prep.data
    if (statusCode === 100 && (pCountDown !== countDown)) {
      window.clearTimeout(this.timer)
      this.startCountDown(countDown)
    }
  }

  componentWillUnmount () {
    window.clearTimeout(this.timer)
  }

  handlePay = (id) => {
    window.location = `${host[window.ENV]}${payOrder}?order_id=${id}`
  }

  renderOperationList = (op, i) => {
    const { orderId, payOrderId } = this.props.data
    const { onCancel, onDelete } = this.props
    switch (op.code) {
      case 1:               // 待支付
        return <div key={i} styleName={classNames('btnArea', 'dark', {disabled: !this.state.canPay})} onClick={this.state.canPay ? () => this.handlePay(payOrderId) : null}>
          付款 {this.state.time}
        </div>
      case 2:               // 取消订单
        return <div key={i} styleName='btnArea delete' onClick={() => onCancel(orderId)}>取消订单</div>
      // case 3:               // 查看物流
      //   return <div key={i} styleName='btnArea light'>追踪物流</div>
      case 3:
        return <div key={i} styleName='btnArea delete' onClick={() => onDelete(orderId)}>删除订单</div>
      case 4:
        return <div key={i} styleName='btnArea light'>退货</div>
    }
  }

  startCountDown = (time) => {
    const run = (t) => {
      this.timer = setTimeout(() => {
        if (t <= 0) {
          this.setState({canPay: false, time: '00:00'})
        } else {
          const minutes = this.joinNumber(Math.floor(t / 60000))
          const seconds = this.joinNumber(Math.floor(t % 60000 / 1000))
          this.setState({canPay: true, time: `${minutes}:${seconds}`}, run(t - 1000))
        }
      }, 1000)
    }
    const minutes = this.joinNumber(Math.floor(time / 60000))
    const seconds = this.joinNumber(Math.floor(time % 60000 / 1000))
    this.setState({canPay: true, time: `${minutes}:${seconds}`})
    run(time)
  }

  joinNumber = (numb) => (numb < 10 ? ('0' + numb) : numb)

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
      <section styleName='content'>
        <Link to={`/order?order_id=${orderId}`}>
          {itemsList.map((item, i) => <LabelItem vertical={false} data={item} key={i} />)}
        </Link>
      </section>
      <section styleName='footer'>
        <div styleName='priceArea'>合计:￥{totalAmount}</div>
        {
          operationList.map(this.renderOperationList)
        }
      </section>
    </div>
  }
}
