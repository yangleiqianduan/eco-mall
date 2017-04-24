import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

export default CSSModules(({ text }) =>  <h2 styleName='wrap'><div>{ text }</div></h2>, styles)
