import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Item from './Item'

@CSSModules(styles, { allowMultiple: true })
export class Shoppingcart extends PureComponent {
  render () {
    const items = [1, 2, 3, 4]
    return <div styleName='wrap'>
      <ul styleName='list'>
        {
          items.map((item, i) => <li key={i}>
            <Item />
            {i === (items.length - 1) ? null : <hr styleName='split' />}
          </li>)
        }
      </ul>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared
})

export default connect(mapStateToProps)(Shoppingcart)
