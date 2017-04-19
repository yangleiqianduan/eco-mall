import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  formatData = (reqData) => {
    let goodsStandard = []
    reqData.product_attribute_info.spu_attribute_info.map(item => {
      let opt = {
        key: item.spu_attribute_key_name,
        value: item.spu_attribute_value_info[0].value,
        long: 0
      }
      goodsStandard.push(opt)
    })
    return goodsStandard
  }

  render () {
    const { reqData } = this.props.data || []
    let goodsStandard = []
    reqData && (goodsStandard = this.formatData(reqData))
    return <div styleName='wrap'>
      <h2>规则参数</h2>
      <ul>
        {
          goodsStandard.map((item, i) => {
            return <li key={i} styleName={item.long && 'long'}>
              <p styleName='tit'>{item.key}：</p>
              <p>{item.value}</p>
            </li>
          })
        }
      </ul>
    </div>
  }
}
