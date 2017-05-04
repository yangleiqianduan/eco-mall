import React, { PureComponent } from 'react'

import CSSModules from 'react-css-modules'
import styles from './Order.styl'

import LabelItem from 'components/LabelItem/'

@CSSModules(styles, { allowMultiple: true })
export default class extends PureComponent {
  render () {
    const items = [
      {firstPageUrl: 'https://image1.ljcdn.com/lmall/93f2c612-f8c7-4cca-9952-ba0556d0ceed.jpg', text: '火山黑 1件', productName: '宜家组合布艺沙发', marketPrice: '2360'},
      {firstPageUrl: 'https://image1.ljcdn.com/lmall/93f2c612-f8c7-4cca-9952-ba0556d0ceed.jpg', text: '火山黑 1件', productName: '宜家组合布艺沙发', marketPrice: '2360'},
      {firstPageUrl: 'https://image1.ljcdn.com/lmall/93f2c612-f8c7-4cca-9952-ba0556d0ceed.jpg', text: '火山黑 1件', productName: '宜家组合布艺沙发', marketPrice: '2360'},
      {firstPageUrl: 'https://image1.ljcdn.com/lmall/93f2c612-f8c7-4cca-9952-ba0556d0ceed.jpg', text: '火山黑 1件', productName: '宜家组合布艺沙发', marketPrice: '2360'}
    ]
    return <div styleName='wrap'>
      <section styleName='header'>
        <div>订单号：198070711</div>
        <div>待付款</div>
      </section>
      <section>
        {items.map((item, i) => <LabelItem vertical={false} data={item} key={i} />)}
      </section>
      <section styleName='footer'>合计:￥4388</section>
    </div>
  }
}
