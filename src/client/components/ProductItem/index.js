import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

export default CSSModules(({ data = {} }) => <Link
  styleName='wrap'
  to={data.wantItem ? '/want' : `/item?id=${data.id}`}>
  <div><img styleName='img' src={data.src} /></div>
  <div styleName='text'>{data.title}</div>
  <div styleName='text'>{data.wantItem ? '' : '￥'}{data.price}</div>
</Link>, styles, {allowMultiple: true})
