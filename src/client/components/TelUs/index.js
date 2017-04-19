import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import { Link } from 'react-router-dom'
import wantPic from 'common/img/want.png'

export default CSSModules(({data}) => <div styleName='wrap'>
  <Link to='/want'><img src={wantPic} /></Link>
</div>, styles)
