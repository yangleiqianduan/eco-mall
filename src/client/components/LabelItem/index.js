import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

export default CSSModules(({ data = {}, noBorder, onClick }) => <div
  onClick={onClick}
  styleName='wrap' style={noBorder ? {border: 'none'} : null}>
  <div styleName='left'>
    <img styleName='img' src={data.url} />
    {data.presellStatus === 2 ? <div styleName='tag'>预售</div> : null}
  </div>
  <div styleName='right'>
    <div styleName='title'><div styleName='long'>{data.title}</div><div><span styleName='x'>x</span>{data.quantity}</div></div>
    <div styleName='text'>
      <div styleName='long'>{data.saleAttributes.map(v => v.value).join('，')}</div>
      <div styleName='price'>￥{data.realPrice}</div>
    </div>
  </div>
</div>, styles, {allowMultiple: true})
