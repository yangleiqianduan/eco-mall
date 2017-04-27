import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'
import classNames from 'classnames/bind'

export default CSSModules(({ bright, children, disabled, onClick, isDisButToast }) => {
  const className = classNames('btn', {
    brightBtn: bright,
    darkBtn: !bright,
    disabled: disabled || isDisButToast
  })
  return <div styleName={className} onClick={disabled ? null : onClick}>
    {children}
  </div>
}, styles, {allowMultiple: true})
