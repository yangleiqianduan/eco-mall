import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createArray } from 'common/utils'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export class Result extends PureComponent {
  render () {
    const list = createArray(20, (i) => i)
    return <div styleName='wrap'>
      <ul>
        {
          list.map((item, i) => <li key={i} styleName='content'><strong>{item}</strong></li>)
        }
      </ul>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.Result
})

export default connect(mapStateToProps)(Result)
