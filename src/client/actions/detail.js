import fetch from 'common/fetch'
import * as api from 'constants/api'

import {
  UPDATE_LOADING_ACTION
} from './index'

// 更新商品信息
export const UPDATE_ITEM_DETAIL = 'UPDATE_ITEM_DETAIL'
export const UPDATE_ITEM_DETAIL_ACTION = (payload) => ({
  type: UPDATE_ITEM_DETAIL,
  payload
})

// 按条件搜索商品
export const getItemDetail = data => dispatch => {
  dispatch(UPDATE_ITEM_DETAIL_ACTION(true))
  fetch(api.goodsDetail, {param: {
    product_id: data.product_id
  }})
  .then(res => {
    if (!res) return dispatch(UPDATE_LOADING_ACTION(false))
    dispatch(UPDATE_ITEM_DETAIL(res.data || []))
    dispatch(UPDATE_LOADING_ACTION(false))
  })
  .catch(e => {
    console.log('返回数据格式错误')
    dispatch(UPDATE_LOADING_ACTION(false))
  })
}
