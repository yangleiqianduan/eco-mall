import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

export default CSSModules(({ data = {} }) => <div styleName='wrap'>
  <Link
    to={`/item?id=${data.id}`}>
    <div>{data.title}</div>
  </Link>
</div>, styles, {allowMultiple: true})
