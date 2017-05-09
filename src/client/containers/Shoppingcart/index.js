import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './index.styl'
import classNames from 'classnames/bind'

import Item from './Item'
import Icon from 'components/Icons/'

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
      <div styleName='footer'>
        <div styleName={classNames('checkAll', {active: true})}><Icon icon='checked' width={18} />&nbsp;全选</div>
        <div styleName='priceArea'>总计：￥4000</div>
        <div styleName='buyArea'>下单</div>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared
})

export default connect(mapStateToProps)(Shoppingcart)
