import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './index.styl'

export default CSSModules(({value, onChange}) => <div styleName='wrap'>
  <div onClick={() => onChange(value - 1)} styleName='btn'>-</div>
  <div styleName='number'>{value}</div>
  <div onClick={() => onChange(value + 1)} styleName='btn'>+</div>
</div>, styles, { allowMultiple: true, errorWhenNotFound: false })
