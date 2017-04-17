import React, { PureComponent } from 'react'
import Icon from 'components/Icon'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export class Collocation extends PureComponent {
  render () {
    return <div>Collocation<Icon icon='loc' /></div>
  }
}

export default Collocation
