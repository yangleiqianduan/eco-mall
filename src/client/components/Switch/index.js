import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'
import classNames from 'classnames/bind'

export default CSSModules(({ value, onChange, disabled }) => {
  const className = classNames('wrap', {
    active: value,
    disabled: disabled
  })
  return <div styleName={className} onClick={disabled ? null : () => onChange(!value)}>
    <div styleName='btn'>
      <div styleName='inner' />
    </div>
  </div>
}, styles, {allowMultiple: true})
