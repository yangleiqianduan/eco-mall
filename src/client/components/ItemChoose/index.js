import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {

  formatData = (reqData) => {
    let chooseInfo = []
    reqData.product_attribute_info.sku_attribute_info.map(item => {
      chooseInfo.push(item.sku_attribute_value_info[0].value)
    })

    return chooseInfo.join('，')
  }

  render () {
    const { data, onShowChoose, onShowParam } = this.props
    console.log(data, 'ssss')
    let chooseInfo = data ? this.formatData(data) : ''

    return <section styleName='wrap'>
      <div styleName='label first' onClick={onShowChoose}>
        <div styleName='long'>已选：<span styleName='value'>{chooseInfo}</span></div>
        <div><span styleName='dot' /><span styleName='dot' /><span styleName='dot' /></div>
      </div>
      <div styleName='label second' onClick={onShowParam}>
        <div styleName='long'>产品参数：<span styleName='value'>这里是产品参数，待添加</span></div>
        <div styleName='dotWrap'><span styleName='dot' /><span styleName='dot' /><span styleName='dot' /></div>
      </div>
    </section>
  }
}
