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
  // if (!data.currentPage) {
  //   dispatch(UPDATE_PAGE_ACTION({current_page: 1, page_size: 6}))
  // }
  dispatch(UPDATE_LOADING_ACTION(true))
  fetch(api.getItems, {param: {
    category_id: data.categoryId,
    current_page: data.currentPage || 1,
    page_size: data.pageSize
  }})
  .then(res => {
    if (!res) return dispatch(UPDATE_LOADING_ACTION(false))
    const result = res.data || {productList: [], page: {}}
    if (!data.currentPage || data.currentPage === 1) {
      dispatch(UPDATE_ITEM_LIST_ACTION({list: result.productList || [], page: result.page || {}}))
    } else {
      dispatch(ADD_ITEM_LIST_ACTION({list: result.productList || [], page: result.page || {}}))
    }
    dispatch(UPDATE_LOADING_ACTION(false))
  })
  .catch(e => {
    console.log('返回数据格式错误')
    dispatch(UPDATE_LOADING_ACTION(false))
  })
}

export const ADD_ITEM_LIST = 'ADD_ITEM_LIST_RESULT'
export const ADD_ITEM_LIST_ACTION = (payload) => ({
  type: ADD_ITEM_LIST,
  payload
})

// 更新页码
// export const UPDATE_PAGE = 'UPDATE_PAGE'
// export const UPDATE_PAGE_ACTION = (payload = {current_page: 1, page_size: 10}) => ({
//   type: UPDATE_PAGE,
//   payload
// })

