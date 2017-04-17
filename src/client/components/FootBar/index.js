import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Button from 'components/Button/'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    const { onBuy } = this.props
    return <div styleName='wrap'>
      <div styleName='content'>
        <div styleName='callUs'>icon</div>
        <div styleName='buyArea'><Button bright onClick={onBuy}>立即预约</Button></div>
      </div>
    </div>
  }
}
