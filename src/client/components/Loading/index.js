import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

export default CSSModules(({size, color}) => <div styleName='spinner' style={Object.assign({}, size ? {width: size, height: size} : null, color ? {borderColor: color} : null)} />, styles)
