import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

export default CSSModules(({ bright, children }) => <div styleName={bright ? 'brightBtn btn' : 'darkBtn btn'}>
  {children}
</div>, styles, {allowMultiple: true})
