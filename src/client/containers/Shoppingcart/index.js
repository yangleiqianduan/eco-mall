import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './index.styl'
import classNames from 'classnames/bind'

import Item from './Item'
import Icon from 'components/Icons/'

import { changeRouter, showToast } from 'actions/index'
import {
  getList,
  UPDATE_CHECK_ACTION,
  CHECK_ALL_ACTION,
  deleteItem,
  updateNumber,
  clearAlert
} from 'actions/shoppingcart'

@CSSModules(styles, { allowMultiple: true })
export class Shoppingcart extends PureComponent {
  componentDidMount () {
    this.props.dispatch(getList())
  }
  componentWillUnmount () {
    this.props.dispatch(clearAlert())
  }
  handleCheck = (i) => this.props.dispatch(UPDATE_CHECK_ACTION(i))
  handleDelete = (i, id) => this.props.dispatch(deleteItem(i, id))
  handleChangeNumber = (i, id, v) => this.props.dispatch(updateNumber(i, id, v))
  handleCheckAll = (payload) => this.props.dispatch(CHECK_ALL_ACTION(payload))
  // 计算时先乘以1000再除1000确保不产生很多小数点
  getTotalPrice = (list) => list.reduce((x, y) => ({quantity: 1, sale_price: x.sale_price * 1000 * x.quantity / 1000 + y.sale_price * 1000 * y.quantity / 1000}), {sale_price: 0, quantity: 1}).sale_price

  handleOrder = () => {
    let checklist = this.props.data.toJS().data.filter(item => item.isChecked)
    if (checklist.length === 0) {
      return this.props.dispatch(showToast('商品不能为空'))
    }
    let param = checklist.map(item => ({sku_id: item.sku_id, buy_count: item.quantity, cart_id: item.cart_id}))
    let transParam = JSON.stringify({sku_list: param, source: 102})
    this.props.dispatch(changeRouter('/orderConfirm?param=' + transParam))
  }
  render () {
    const { data } = this.props.data.toJS()
    const checkedItems = data.filter(d => d.isChecked)
    const isCheckedAll = data.length && checkedItems.length === data.length
    return <div styleName='wrap'>
      <ul styleName={classNames({list: data.length > 0})}>
        {data.length === 0
          ? <div styleName='empty'>购物车为空</div>
          : null
        }
        {
          data.map((item, i) => <li key={i}>
            <Item data={item} onCheck={() => this.handleCheck(i)} onDelete={(id) => this.handleDelete(i, id)} onChangeNumber={(id, v) => this.handleChangeNumber(i, id, v)} />
            {i === (data.length - 1) ? null : <hr styleName='split' />}
          </li>)
        }
      </ul>
      <div styleName='footer'>
        <div onClick={() => this.handleCheckAll(!isCheckedAll)} styleName={classNames('checkAll', {active: isCheckedAll})}><Icon icon='checked' width={18} />&nbsp;全选</div>
        <div styleName='priceArea'>总计：￥{this.getTotalPrice(checkedItems)}</div>
        <div styleName='buyArea' onClick={this.handleOrder.bind(this)}>下单</div>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.shoppingcart
})

export default connect(mapStateToProps)(Shoppingcart)
