import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './index.styl'
import classNames from 'classnames/bind'

export default CSSModules(({value, onChange, min, max, disabled}) => <div styleName='wrap'>
  <div onClick={disabled ? null : () => onChange(value - 1)} styleName={classNames('btn', {disabled: min === value || disabled})}>-</div>
  <div styleName='number'>{value}</div>
  <div onClick={disabled ? null : () => onChange(value + 1)} styleName={classNames('btn', {disabled: max === value || disabled})}>+</div>
</div>, styles, { allowMultiple: true, errorWhenNotFound: false })
