import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import { Link } from 'react-router-dom'

export default CSSModules(({data}) => <div styleName='wrap'>
  <Link to={data.link}><img src={data.pic} /></Link>
</div>, styles)
