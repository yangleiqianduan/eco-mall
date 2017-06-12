import React, { PureComponent } from 'react'

import CSSModules from 'react-css-modules'
import styles from './Order.styl'
import classNames from 'classnames/bind'

import LabelItem from 'components/LabelItem/'
import { Link } from 'react-router-dom'

@CSSModules(styles, { allowMultiple: true })
export default class extends PureComponent {
  state = {
    canPay: false,
    time: '00:00'
  }

  componentDidMount () {
    const { statusCode, countDown } = this.props.data
    
  }

  componentDidUpdate (prep) {
    const { statusCode, countDown } = this.props.data
    const { pCountDown } = prep.data
    
  }

  componentWillUnmount () {
    window.clearTimeout(this.timer)
  }

  joinNumber = (numb) => (numb < 10 ? ('0' + numb) : numb)

  render () {
    const { itemsList, operationList, status, statusCode } = this.props.data
    const statusStyle = classNames('gray', {
      red: statusCode === 100,
      yollow: statusCode === 200,
      green: statusCode === 300
    })
    return <div styleName='wrap'>
      <section styleName='header'>
        <div><strong>订单详情</strong></div>
        <div styleName={statusStyle}>{status}</div>
      </section>
      <section styleName='content'>
        {itemsList.map((item, i) => <LabelItem onClick={() => this.props.changeRouter(`/item?id=${item.productId}`)} vertical={false} data={item} key={i} noBorder={(itemsList.length - 1) === i} />)}
      </section>
    </div>
  }
}
