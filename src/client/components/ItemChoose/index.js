import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import classNames from 'classnames/bind'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    // status 是0表示商品可买
    const { canBuy, skuChoose, params, onShowChoose, onShowParam } = this.props

    return <section styleName='wrap'>
      {
        canBuy
        ? <div styleName='label first' onClick={onShowChoose}>
          <div styleName='long'><span styleName='value'>已选：</span><span styleName='value'>{skuChoose || '请选择规格参数'}</span></div>
          <div styleName='dotWrap'><span styleName='dot' /><span styleName='dot' /><span styleName='dot' /></div>
        </div>
        : null
      }
      <div styleName={classNames('label', 'second', {noTop: !canBuy})} onClick={onShowParam}>
        <div styleName='long'><span styleName='value'>产品参数：</span><span styleName='value'>{params.map(item => item.spu_attribute_key_name + ' ' + item.spu_attribute_value_info.map(item => item.value).join(','))[0]}...</span></div>
        <div styleName='dotWrap'><span styleName='dot' /><span styleName='dot' /><span styleName='dot' /></div>
      </div>
    </section>
  }
}
