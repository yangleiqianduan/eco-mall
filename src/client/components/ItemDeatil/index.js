import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    const { reqData } = this.props.data || {}
    const { product_desc } = reqData || { product_desc: '' }
    return <div styleName='wrap'>
        <h2>商品详情</h2>
        <div dangerouslySetInnerHTML={{__html: product_desc }}></div>
    </div>
  }
}
