import React, { PureComponent, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import Icon from 'components/Icons'
import NumberInput from 'components/NumberInput/'

import styles from './index.styl'
import classNames from 'classnames/bind'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    show: PropTypes.bool
  }
  state = {
    result: {}
  }
  handleClick = (e) => {
    this.props.onClickCover(e)
  }

  dealInv = (inv) => {
    // 取得总库存
    if (!inv) return 0
    if (Object.keys(inv).length > 1) {
      const inventoryTotal = Object.keys(inv).reduce((x, y) => (inv[x] + inv[y])) || 0
      return inventoryTotal
    } else {
      return inv[Object.keys(inv)[0]] || 0
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

  render () {
    const {
      img,
      price,
      skuChoose,
      skuMapKey,
      number,
      onChangeNumber,
      inventory,
      onChangeSku,
      show,
      currentOperate,
      onSubmit
    } = this.props
    const data = this.transformData(this.props.data, skuMapKey)

    return <div styleName='wrap'>
      {
      this.props.show
      ? <div styleName='cover' onClick={this.handleClick.bind(this)} />
      : null
      }
      <div styleName={classNames('infoContainer', {show: show, hide: !show})}>
        <div styleName='skuContainer'>
          <div styleName='skuImg'>
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
              <NumberInput value={number} onChange={onChangeNumber} />
            </div>
          </div>
        </div>
        <div styleName='btnArea'>
          <div styleName='container' onClick={() => onSubmit(currentOperate)}>
            确定
          </div>
        </div>
      </div>
    </div>
  }
}
