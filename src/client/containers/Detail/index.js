import React, { PureComponent } from 'react'
import { createArray } from 'common/utils'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import FootBar from 'components/FootBar/'

@CSSModules(styles, {allowMultiple: true})
export class Detail extends PureComponent {
  render () {
    const list = createArray(20, (i) => i)
    return <div>
      Detail
      <ul>
        {
          list.map((item, i) => <li key={i} styleName='content'><strong>{item}</strong></li>)
        }
      </ul>
      <FootBar icon={null} button={null} />
    </div>
  }
}

export default Detail
