import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './index.styl'
import classNames from 'classnames/bind'

import { isAndroid } from 'common/utils'

export default CSSModules(({value, onChange, min, max, disabled}) => <div styleName='wrap'>
  <div onClick={disabled ? null : () => onChange(value - 1)} styleName={classNames({btn: !isAndroid, aBtn: isAndroid, disabled: min === value || disabled})}><span>-</span></div>
  <div styleName={classNames({number: !isAndroid, aNumber: isAndroid})}>{value}</div>
  <div onClick={disabled ? null : () => onChange(value + 1)} styleName={classNames({btn: !isAndroid, aBtn: isAndroid, disabled: max === value || disabled})}><span>+</span></div>
</div>, styles, { allowMultiple: true, errorWhenNotFound: false })
