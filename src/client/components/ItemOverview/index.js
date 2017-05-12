import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {

  formatData = (reqData) => {
    let baseInfo = {}
    const { service_assurance_info } = reqData || {service_assurance_info: []}
    baseInfo.title = reqData.product_name
    baseInfo.tags = []
    reqData.product_attribute_info.sku_attribute_info.map(item => {
      baseInfo.tags.push(item.sku_attribute_value_info[0].value)
    })
    baseInfo.salePrice = reqData.product_price_info[-1].sale_price
    baseInfo.marketPrice = reqData.product_price_info[-1].market_price
    baseInfo.deliveryMsg = reqData.delivery_msg || '暂无'
    baseInfo.skuStore = reqData.product_inv_info.sku_inv[-1][-1] || '暂无'
    baseInfo.deliveryCity = reqData.delivery_city || '暂无'
    baseInfo.tips = []

    service_assurance_info.map(item => {
      baseInfo.tips.push(item.service_assurance_name)
    })
    return baseInfo
  }

  render () {
    const { data, onShowService, marketPrice, salePrice } = this.props
    let baseInfo = data.product_name ? this.formatData(data) : null

    if (baseInfo) {
      return <div styleName='wrap'>
        <header>
          <div styleName='left'>
            <h1>{baseInfo.title || ''}</h1>
            <h2>暂不显示</h2>
          </div>
          <div styleName='right'>
            <p styleName='salePrice'>￥{salePrice}</p>
            <p styleName='marketPrice'>市场价：￥{marketPrice}</p>
          </div>
        </header>
        <div styleName='tags'>
          <span styleName='item'>{data.product_attribute_info.brand_info}</span>
        </div>
        <section styleName='main'>
          <div>快递：{baseInfo.deliveryMsg}</div>
          <div>库存：{baseInfo.skuStore}</div>
          <div>发货：{baseInfo.deliveryCity}</div>
        </section>
        <footer onClick={onShowService}>
          <ul>
            {
              baseInfo.tips.map((item, i) => <li key={i} styleName='item'>{item}</li>)
            }
          </ul>
          <div styleName='dotWrap'><span styleName='dot' /><span styleName='dot' /><span styleName='dot' /></div>
        </footer>
      </div>
    } else {
      return null
    }
  }
}
