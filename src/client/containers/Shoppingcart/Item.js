import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Item.styl'
import classNames from 'classnames/bind'

import { Link } from 'react-router-dom'
import Icon from 'components/Icons/'
import NumberInput from 'components/NumberInput/'

@CSSModules(styles, { allowMultiple: true })
export default class extends PureComponent {
  state = {
    showDelete: false,
    touchStartPosition: 0,
    innerHeight: 135
  }
  componentDidMount () {
    this.setState({innerHeight: this.refs.inner.getBoundingClientRect().height})
  }
  componentWillUnount () {
    window.clearTimeout(this.hidden)
  }
  showDelete = () => {
    this.setState({
      showDelete: true
    })
    this.hidden = setTimeout(() => this.setState({showDelete: false}), 2000)
  }
  hiddenDelete = () => {
    window.clearTimeout(this.hidden)
    this.setState({showDelete: false})
  }
  onTouchStart = (e) => {
    this.setState({touchStartPosition: e.changedTouches[0].clientX})
  }
  onTouchMove = (e) => {
    const currentPosition = e.changedTouches[0].clientX
    if (currentPosition - this.state.touchStartPosition < -70) {
      this.setState({touchStartPosition: currentPosition})
      this.showDelete()
    } else if (currentPosition - this.state.touchStartPosition > 70) {
      this.setState({touchStartPosition: currentPosition})
      this.hiddenDelete()
    }
  }
  render () {
    const deleteStyl = classNames('delete', {showDelete: this.state.showDelete})
    const { data, onCheck, onChangeNumber, onDelete } = this.props
    const {product_id: id, cart_id: cartId, product_img_url: imgUrl, product_name: name, sale_price: price, quantity, sku_attribute_kv_pairs: sku, isChecked, is_off_shelf: disabled} = data
    return <div styleName='wrap' style={{height: this.state.innerHeight + 'px'}}>
      <div styleName='inner' ref='inner'>
        <div styleName='pannel' onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} style={{width: document.body.getBoundingClientRect().width + 'px'}}>
          <div styleName='checkArea' onClick={disabled ? null : onCheck}>{disabled ? <small styleName='offShelf'>失效</small> : <Icon icon={isChecked ? 'checked' : 'unChecked'} width={18} />}</div>
          <div><Link to={`/item?id=${id}`}><img styleName='img' src={imgUrl} /></Link></div>
          <div styleName='titleArea'>
            <div styleName='title'>{name}</div>
            <div styleName='light'>{sku.map(it => it.value).join('，')}</div>
            <div styleName='priceArea'>￥{price}<NumberInput value={quantity} onChange={(v) => onChangeNumber(cartId, v)} /></div>
          </div>
        </div>
        <div styleName={deleteStyl} onClick={() => onDelete(cartId)}>
          删除
        </div>
      </div>
    </div>
  }
}
