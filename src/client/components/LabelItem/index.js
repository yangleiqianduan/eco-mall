import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

export default CSSModules(({ data = {}, noBorder, onClick }) => <div
  onClick={onClick}
  styleName='wrap' style={noBorder ? {border: 'none'} : null}>
  <div styleName='left'><img styleName='img' src={data.url} /></div>
  <div styleName='right'>
    <div styleName='title'>{data.title}</div>
    <div styleName='text'>{data.saleAttributes.map(v => v.value).join('，')}&nbsp;&nbsp;{data.quantity}件</div>
    <div styleName='price'>￥{data.realPrice}</div>
  </div>
</div>, styles, {allowMultiple: true})
