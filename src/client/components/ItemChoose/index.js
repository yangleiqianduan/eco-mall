import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    const { skuChoose, params, onShowChoose, onShowParam } = this.props

    return <section styleName='wrap'>
      <div styleName='label first' onClick={onShowChoose}>
        <div styleName='long'>已选：<span styleName='value'>{skuChoose || '请选择规格参数'}</span></div>
        <div><span styleName='dot' /><span styleName='dot' /><span styleName='dot' /></div>
      </div>
      <div styleName='label second' onClick={onShowParam}>
        <div styleName='long'>产品参数：<span styleName='value'>{params.map(item => item.spu_attribute_key_name + ' ' + item.spu_attribute_value_info.map(item => item.value).join(','))[0]}...</span></div>
        <div styleName='dotWrap'><span styleName='dot' /><span styleName='dot' /><span styleName='dot' /></div>
      </div>
    </section>
  }
}
