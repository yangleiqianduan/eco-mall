import fetch from 'common/fetch'
import * as api from 'constants/api'

import {
  UPDATE_LOADING_ACTION,
  alert
} from './index'

export const UPDATE_LIST = 'UPDATE_LIST_SHOPPINGCART'
export const UPDATE_LIST_ACTION = (payload) => ({
  type: UPDATE_LIST,
  payload
})

// 获取购物车列表
export const getList = () => async dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  const result = await fetch(api.getShoppingcartItems)
  dispatch(UPDATE_LOADING_ACTION(false))
  if (!result) return false
  dispatch(UPDATE_LIST_ACTION(result.data))
}

// 更新选择
export const UPDATE_CHECK = 'UPDATE_CHECK_SHOPPINGCART'
export const UPDATE_CHECK_ACTION = (payload) => ({
  type: UPDATE_CHECK,
  payload
})

// 全选
export const CHECK_ALL = 'CHECK_ALL_SHOPPINGCART'
export const CHECK_ALL_ACTION = (payload) => ({
  type: CHECK_ALL,
  payload
})

export const DELETE_ITEM = 'DELETE_ITEM_SHOPPINGCART'
export const DELETE_ITEM_ACTION = (payload) => ({
  type: DELETE_ITEM,
  payload
})

// 删除商品
export const deleteItem = (i, id) => dispatch => {
  dispatch(alert({
    text: '确认删除该商品么？',
    type: 'confirm',
    onSure: () => {
      // 不需要顺序进行
      fetch(api.deleteShoppingcartItem, {method: 'post', formData: true, param: {cart_ids: [id]}})
      dispatch(DELETE_ITEM_ACTION(i))
      dispatch(alert({show: false}))
    }
  }))
}

export const UPDATE_NUMBER = 'UPDATE_NUMBER_SHOPPINGCART'
export const UPDATE_NUMBER_ACTION = (index, payload) => ({
  type: UPDATE_NUMBER,
  index,
  payload
})

// 修改商品数量
export const updateNumber = (i, id, v) => dispatch => {
  if (v === 0) {
    dispatch(deleteItem(i, id))
  } else {
    // 不需要顺序进行
    fetch(api.updateShoppingcartItemNumer, {method: 'post', formData: true, param: {cart_id: id, quantity: v}})
    dispatch(UPDATE_NUMBER_ACTION(i, v))
  }
}
