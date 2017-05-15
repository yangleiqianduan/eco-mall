import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

export default CSSModules(({ data = {} }) => <Link
  styleName='wrap'
  to={data.wantItem ? '/want' : `/item?id=${data.productId}`}>
  <div><img styleName='img' src={data.firstPageUrl} /></div>
  <div styleName='text'>{data.productName}</div>
  <div styleName={data.wantItem ? 'price normal' : 'price'}>{data.wantItem ? '' : '￥'}{data.lowestPrice}</div>
</Link>, styles, {allowMultiple: true})
