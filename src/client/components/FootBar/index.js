import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    return <div styleName='wrap'>
      <div styleName='content'>
        <div>icon</div>
        <div>立即购买</div>
      </div>
    </div>
  }
}
