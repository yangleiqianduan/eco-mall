import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import { Link } from 'react-router-dom'
import Icon from 'components/Icons/'

export default CSSModules(({ cartCount }) => <div styleName='wrap'>
  <div>
    <Link to='/mine'><Icon icon='personal' width={15} stroke={'#FFF'} /></Link>
  </div>
  <hr />
  <div>
    <Link to='shoppingcart' styleName='shoppingcart'>
      <Icon icon='cart' width={18} stroke={'#FFF'} />
      { cartCount > 0
        ? <div styleName='mark'><span>{cartCount}</span></div>
        : null
      }
    </Link>
  </div>
</div>, styles, {allowMultiple: true})
