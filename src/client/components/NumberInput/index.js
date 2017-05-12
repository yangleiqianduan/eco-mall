import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './index.styl'
import classNames from 'classnames/bind'

export default CSSModules(({value, onChange, min, max}) => <div styleName='wrap'>
  <div onClick={() => onChange(value - 1)} styleName={classNames('btn', {disabled: min === value})}>-</div>
  <div styleName='number'>{value}</div>
  <div onClick={() => onChange(value + 1)} styleName={classNames('btn', {disabled: max === value})}>+</div>
</div>, styles, { allowMultiple: true, errorWhenNotFound: false })
