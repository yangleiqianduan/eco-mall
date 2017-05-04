import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

export default CSSModules(({ data = {} }) => <Link
  styleName='wrap'
  onClick={e => e.preventDefault()}
  to={`/item?id=${data.productId}`}>
  <div styleName='left'><img styleName='img' src={data.firstPageUrl} /></div>
  <div styleName='right'>
    <div styleName='title'>{data.productName}</div>
    <div styleName='text'>{data.text}</div>
    <div styleName='price'>￥{data.marketPrice}</div>
  </div>
</Link>, styles, {allowMultiple: true})
