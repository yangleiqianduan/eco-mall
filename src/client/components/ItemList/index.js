import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Icon from 'components/Icon/'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    const items = this.props.data.productInfo || []
    return <div styleName='wrap'>
      <div styleName='card'>
        <div>
          <div styleName='radio radio-checked'><Icon icon='check' size={10} /></div><span styleName='light'>全选</span>
        </div>
        <div styleName='priceOuter'>
          总价：<span styleName='red'>￥12368</span>
        </div>
      </div>
      {
        items.map((item, i) => <div styleName='card' key={i}>
          <div styleName='item'>
            <div>
              <div styleName='radio radio-checked'><Icon icon='check' size={10} /></div>
              <img styleName='itemImg' src='http://img.ljcdn.com/lmall/cf361c47-ffda-4b1d-9e93-29e7662e3c79.jpg' />
            </div>
            <div styleName='itemDesc'>
              <h3>工业风格立式阅读灯</h3>
              <p styleName='itemText'>角度360°可调，轻松阅读最佳伴侣</p>
              <p styleName='itemText'>颜色：火山黑</p>
              <p>￥2360</p>
            </div>
          </div>
        </div>)
      }
    </div>
  }
}
