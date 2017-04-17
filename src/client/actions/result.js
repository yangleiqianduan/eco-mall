import fetch from 'common/fetch'
import * as api from 'constants/api'

import {
  UPDATE_LOADING_ACTION
} from './index'

// 更新商品列表
export const UPDATE_ITEM_LIST = 'UPDATE_ITEM_LIST_RESULT'
export const UPDATE_ITEM_LIST_ACTION = (payload) => ({
  type: UPDATE_ITEM_LIST,
  payload
})

// 按条件搜索商品
export const getItems = data => dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  fetch(api.getItems, {param: {
    category_id: data.categoryId
  }})
  .then(res => {
    if (!res) return dispatch(UPDATE_LOADING_ACTION(false))
    dispatch(UPDATE_ITEM_LIST_ACTION(res.data || []))
    dispatch(UPDATE_LOADING_ACTION(false))
  })
  .catch(e => {
    console.log('返回数据格式错误')
    dispatch(UPDATE_LOADING_ACTION(false))
  })
}
