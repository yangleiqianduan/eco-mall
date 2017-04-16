import React, { PureComponent } from 'react'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export class Collocation extends PureComponent {
  render () {
    return <div styleName='wrap'>Collocation</div>
  }
}

export default Collocation
