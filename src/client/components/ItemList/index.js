import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Icon from 'components/Icon/'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    const items = this.props.data.productInfo || []
    const isCheckedAll = items.length === items.filter(item => item.checked).length
    return <div styleName='wrap'>
      <div styleName='card'>
        <div>
          <div onClick={() => this.props.onCheckAll(!isCheckedAll)} styleName={isCheckedAll ? 'radio radio-checked' : 'radio'}><Icon icon='check' size={10} /></div><span styleName='light'>全选</span>
        </div>
        <div styleName='priceOuter'>
          总价：<span styleName='red'>￥12368</span>
        </div>
      </div>
      {
        items.map((item, i) => <div styleName='card' key={i}>
          <div styleName='item'>
            <div>
              <div onClick={() => this.props.onCheckItem(i)}
                styleName={item.checked ? 'radio radio-checked' : 'radio'}>
                <Icon icon='check' size={10} />
              </div>
              <img styleName='itemImg' src='http://img.ljcdn.com/lmall/cf361c47-ffda-4b1d-9e93-29e7662e3c79.jpg' />
            </div>
            <div styleName='itemDesc'>
              <h3>{item.title}</h3>
              <p styleName='itemText'>{item.productMixReason}</p>
              <p styleName='itemText'>{item.productAttributeInfoList.map((sku, j) => <span key={j}>
                {sku.attributeKeyName}:{sku.attributeValues[0].value}&nbsp;&nbsp;
              </span>)}</p>
              <p>￥{item.price}</p>
            </div>
          </div>
        </div>)
      }
    </div>
  }
}
