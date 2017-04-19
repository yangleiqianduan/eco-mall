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
    const { reqData } = this.props.data || {}
    let chooseInfo = ''
    reqData && (chooseInfo = this.formatData(reqData))

    if (chooseInfo) {
      return <div styleName='wrap'>已选：<span> {chooseInfo} </span></div>
    } else {
      return <div styleName='wrap'>已选：</div>
    }
  }
}
