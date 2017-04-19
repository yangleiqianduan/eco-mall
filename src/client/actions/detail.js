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

// 按条件获得商品详情信息
export const getItemDetail = data => dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  fetch(api.itemDetail, {param: {
    // product_id: data.product_id
    product_id: '118001004_1491020556160_8888'
  }})
  .then(res => {
    if (!res) return dispatch(UPDATE_LOADING_ACTION(false))
    dispatch(UPDATE_ITEM_DETAIL_ACTION(res.data || []))
    dispatch(UPDATE_LOADING_ACTION(false))
  })
  .catch(e => {
    console.log('返回数据格式错误')
    dispatch(UPDATE_LOADING_ACTION(false))
  })
}
