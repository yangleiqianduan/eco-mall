import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

export default CSSModules(({ data = [] }) => <div styleName='wrap'>
  {
    data.map((item, i) => <div key={i} styleName='container'>
      <Link
        to={item.wantItem ? '/want' : `/item?id=${item.id}`}>
        <div><img styleName='img' src={item.src} /></div>
        <div styleName='text'>{item.title}</div>
        <div styleName='text'>￥{item.price}</div>
      </Link>
    </div>)
  }
</div>, styles, {allowMultiple: true})
