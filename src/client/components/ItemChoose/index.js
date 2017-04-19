import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    const choose = this.props.data || []
    return <div styleName='wrap'>
        已选：<span>{choose.standard}</span>
    </div>
  }
}
