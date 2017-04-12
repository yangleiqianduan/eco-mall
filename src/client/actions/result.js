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
  fetch(api.getItems, {body: {
    category_id: data.secondCategory || data.firstCategory,
    current_page: data.currentPage || 1,
    page_size: data.pageSize || 20,
    pay_method: data.payMethod,
    price_range: data.priceRange,
    query_str: data.query,
    sort_column: data.sortColumn,
    sort_type: data.sortType
  }})
  .then(res => {
    if (!res) return dispatch(UPDATE_LOADING_ACTION(false))
    const result = res.data || {}
    dispatch(UPDATE_ITEM_LIST_ACTION({
      data: result.productList || [],
      payMethodList: result.searchCondition.payMethodList || [],
      priceRangeList: result.searchCondition.priceRangeList || [],
      pagination: result.page
    }))
    dispatch(UPDATE_LOADING_ACTION(false))
  })
  .catch(e => {
    console.log('返回数据格式错误')
    dispatch(UPDATE_LOADING_ACTION(false))
  })
}
