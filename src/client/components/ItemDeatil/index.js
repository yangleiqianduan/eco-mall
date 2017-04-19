import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    const data = this.props.data || []
    return <div styleName='wrap'>
        <h2>商品详情</h2>
        <img src={data.pic} alt='' />
    </div>
  }
}
