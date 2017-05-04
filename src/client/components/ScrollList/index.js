import React, { PureComponent } from 'react'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, { allowMultiple: true })
export default class extends PureComponent {
  render () {
    const { data, renderItem } = this.props
    return <div>
      {data.map((item, key) => renderItem(item, key))}
    </div>
  }
}
