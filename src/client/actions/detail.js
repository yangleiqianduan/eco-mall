import fetch from 'common/fetch'
import * as api from 'constants/api'

import {
  UPDATE_LOADING_ACTION,
  showToast,
  changeRouter,
  getCartCount
} from './index'

// 更新商品信息
export const UPDATE_ITEM_DETAIL = 'UPDATE_ITEM_DETAIL'
export const UPDATE_ITEM_DETAIL_ACTION = (payload) => ({
  type: UPDATE_ITEM_DETAIL,
  payload
})

// 按条件获得商品详情信息
export const getItemDetail = id => dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  fetch(api.itemDetail, {param: {
    product_id: id
    // product_id: '118001004_1491020556160_8888'
  }})
  .then(res => {
    if (!res) return dispatch(UPDATE_LOADING_ACTION(false))
    dispatch(UPDATE_ITEM_DETAIL_ACTION(res.data || null))
    dispatch(UPDATE_LOADING_ACTION(false))
  })
  .catch(e => {
    console.log('返回数据格式错误')
    dispatch(UPDATE_LOADING_ACTION(false))
  })
}

// 添加到购物车
export const addToShoppingcart = (param, cb) => async dispatch => {
  const result = await fetch(api.addToCart, {method: 'post', formData: true, param}, false, true)
  if (result.code === '1') {
    dispatch(showToast('添加成功'))
    dispatch(getCartCount())
    if (typeof cb === 'function') {
      cb()
    }
  } else {
    dispatch(showToast(result.msg || '添加失败'))
  }
}

// 立即购买
export const toBuy = (param) => dispatch => {
  dispatch(changeRouter(`/orderConfirm?param=${JSON.stringify(param)}`))
}

// 返回初始状态
export const TO_INIT = 'TO_INIT_DETAIL'
export const TO_INIT_ACTION = () => ({
  type: TO_INIT
})
