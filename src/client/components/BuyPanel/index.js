import React, { PureComponent, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import Icon from 'components/Icons'
import NumberInput from 'components/NumberInput/'

import styles from './index.styl'
import classNames from 'classnames/bind'

import { updateBodyScroll } from 'common/utils'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    show: PropTypes.bool
  }
  state = {
    innerShow: false
  }
  handleClick = (e) => {
    this.props.onClickCover(e)
  }

  dealInv = (inv) => {
    // 取得总库存
    if (typeof inv === 'number') return inv
    if (!inv) return 0
    if (Object.keys(inv).length > 1) {
      const inventoryTotal = Object.keys(inv).reduce((x, y) => (inv[x] + inv[y])) || 0
      return inventoryTotal
    } else {
      return inv[Object.keys(inv)[0]] || 0
    }
  }
  handleChangeNumber = (v) => {
    const {
      showToast,
      onChangeNumber,
      inventory
    } = this.props
    const maxNumber = this.dealInv(inventory)
    if (v < 1) {
      showToast('最小数量为1')
    } else if (v > maxNumber) {
      showToast(`最大购买数量为${maxNumber}`)
    } else {
      onChangeNumber(v)
    }
  }

  transformData (data, skuMapKeyArr) {
    /*
    {
      label: '选择类型1',
      id: 1,
      disabled: false,
      checked: false,
      options: [{value: '红色', key: 1, disabled: 'false'}]
    }
    */
    const map = skuMapKeyArr.slice()
    const skuMap = this.props.skuMap
    const inventorySkuMap = this.props.inventorySkuMap

    return data.map((d, i) => {
      return {
        label: d.sku_attribute_key_name,
        id: d.sku_attribute_key_id,
        options: d.sku_attribute_value_info.map(o => {
          const checkMap = map.slice()
          checkMap[i] = o.key
          const mayValidKey = Object.keys(skuMap).filter(key => {           // 判断是否有对应的合法sku map key
            return checkMap.filter(ch => key.indexOf(ch) > -1).length === checkMap.length
          })

          const inventoryArr = []
          // 改商品总库存数是否为0
          mayValidKey.map(key => {
            inventoryArr.push(this.dealInv(inventorySkuMap[skuMap[key]]) || 0)
          })

          const totalInventory = inventoryArr.reduce((x, y) => (x + y), 0)

          if (mayValidKey.length > 0 && totalInventory > 0) {
            o.disabled = false
          } else {
            o.disabled = true
          }
          return o
        }),
        value: map[i]
      }
    })
  }

  componentDidUpdate (prep) {
    const show = this.props.show
    if (prep.show !== show) {
      // 禁止浏览器滚动
      updateBodyScroll(!show)
      // 内部动画
      this.setState({innerShow: this.props.show})
    }
  }

  componentWillUnmount () {
    updateBodyScroll(true)
  }

  render () {
    const {
      onClickSkuImage,
      img,
      price,
      skuChoose,
      skuMapKey,
      number,
      inventory,
      onChangeSku,
      show,
      currentOperate,
      onSubmit
    } = this.props
    const data = this.transformData(this.props.data, skuMapKey)

    const canBuy = skuMapKey.filter(str => str).length === skuMapKey.length

    const innerShow = this.state.innerShow

    return <div styleName={classNames('wrap', {showOuter: show})} onClick={this.handleClick.bind(this)}>
      <div styleName={classNames('infoContainer', {show: innerShow, hide: !innerShow})} onClick={e => e.stopPropagation()}>
        <div styleName='skuContainer'>
          <div styleName='skuImg' onClick={onClickSkuImage}>
            <img src={img} />
          </div>
          <div styleName='skuInfo'>
            <div styleName='price'>￥{price}</div>
            <div styleName='info'>库存:{this.dealInv(inventory)}</div>
            <div styleName='info'>已选:{skuChoose}</div>
          </div>
          <div styleName='close' onClick={this.handleClick.bind(this)}><Icon icon='layerClose' width={35} /></div>
        </div>
        <div styleName='line' />
        <div styleName='checkArea'>
          {
          data.map((d, i) => <div key={i} styleName='attrArea'>
            <p styleName='label'>{d.label}</p>
            <ul styleName='itemSkuOuter'>
              {
                d.options.map((option, j) => <li key={j}
                  onClick={option.disabled ? null : () => onChangeSku(i, option.key)}
                  styleName={classNames('attr', {active: option.key === d.value, disabled: option.disabled})}>
                  <div styleName='sku'>
                    {option.value}
                  </div>
                </li>)
              }
            </ul>
          </div>)
          }
          <div styleName='attrArea'>
            <p styleName='label'>数量</p>
            <div>
              <NumberInput value={number} min={1} max={this.dealInv(inventory)} onChange={this.handleChangeNumber} />
            </div>
          </div>
        </div>
        {
          currentOperate
          ? <div styleName={classNames('btnArea', {disabled: !canBuy})}>
            <div styleName='container sure' onClick={canBuy ? () => onSubmit(currentOperate) : null}>
              确定
            </div>
          </div>
          : <div styleName={classNames('btnArea', {disabled: !canBuy})}>
            <div styleName='add container' onClick={canBuy ? () => onSubmit(1) : null}>加入购物车</div>
            <div styleName='buy container' onClick={canBuy ? () => onSubmit(2) : null}>立即购买</div>
          </div>
        }
      </div>
    </div>
  }
}
