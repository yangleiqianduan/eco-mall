import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

export default CSSModules(({children}) => <div styleName='wrap'>
  <div styleName='container'>{children}</div>
</div>, styles)
