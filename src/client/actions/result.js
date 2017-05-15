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
  if(!data.currentPage) {
    dispatch(UPDATE_PAGE_ACTION({current_page: 1, page_size: 10}))
  }
  dispatch(UPDATE_LOADING_ACTION(true))
  fetch(api.getItems, {param: {
    category_id: data.categoryId,
    current_page: data.currentPage || 1,
    page_size: 10
  }})
  .then(res => {
    if (!res) return dispatch(UPDATE_LOADING_ACTION(false))
    dispatch(UPDATE_ITEM_LIST_ACTION(res.data || []))
    dispatch(UPDATE_LOADING_ACTION(false))
    dispatch(UPDATE_PAGE_ACTION(res.data.page))
  })
  .catch(e => {
    console.log('返回数据格式错误')
    dispatch(UPDATE_LOADING_ACTION(false))
  })
}

// 更新页码
export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_PAGE_ACTION = (payload = {current_page: 1, page_size: 10}) => ({
  type: UPDATE_PAGE,
  payload
})

