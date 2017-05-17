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
  getTotalPrice = (list) => {
    // 计算时先乘以1000再除1000确保不产生很多小数点
    return list.map(item => item.sale_price * 1000 * item.quantity).reduce((x, y) => x + y, 0) / 1000
  }

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
    const ableData = data.filter(d => !d.is_off_shelf)
    const isCheckedAll = ableData.length && checkedItems.length === ableData.length
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
        <div onClick={() => this.handleCheckAll(!isCheckedAll)} styleName={classNames('checkAll', {active: isCheckedAll})}><span styleName='checkIcon'><Icon icon={isCheckedAll ? 'checked': 'unChecked'} width={18} /></span>&nbsp;&nbsp;全选</div>
        <div styleName='priceArea'>总计：￥{this.getTotalPrice(checkedItems)}</div>
        <div styleName='buyArea' onClick={this.handleOrder.bind(this)}>去结算</div>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.shoppingcart
})

export default connect(mapStateToProps)(Shoppingcart)
