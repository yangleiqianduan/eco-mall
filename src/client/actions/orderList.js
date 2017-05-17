import fetch from 'common/fetch'
import * as api from 'constants/api'

import {
  showToast,
  UPDATE_LOADING_ACTION
} from './index'

// 更新订单列表
export const UPDATE_ORDER_LIST = 'UPDATE_ORDER_LIST_ORDERLIST'
export const UPDATE_ORDER_LIST_ACTION = (payload) => ({
  type: UPDATE_ORDER_LIST,
  payload
})

// 替换订单列表
export const REPLACE_ORDER_LIST = 'REPLACE_ORDER_LIST_ORDERLIST'
export const REPLACE_ORDER_LIST_ACTION = (payload) => ({
  type: REPLACE_ORDER_LIST,
  payload
})

export const getOrderList = (param = {}) => async dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  const result = await fetch(api.getOrderList, {param: Object.assign({page_size: 10, current_page: 1}, param)})
  dispatch(UPDATE_LOADING_ACTION(false))
  const { orders, page } = result.data || {orders: [], page: {totalPage: 0}}
  if (parseInt(param.current_page) === 1 || !param.current_page) {
    // 让付款按钮展示在最右边
    dispatch(REPLACE_ORDER_LIST_ACTION({orders: orders.map(o => Object.assign(o, {operationList: o.operationList.reverse()})), page}))
  } else {
    dispatch(UPDATE_ORDER_LIST_ACTION({orders, page}))
  }
}

export const DELETE_ORDER = 'DELETE_ORDER_ORDER_LIST'
export const DELETE_ORDER_ACTION = (payload) => ({
  type: DELETE_ORDER,
  payload
})

export const cancelOrder = (id, index) => async dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  const result = await fetch(api.cancelOrder, {param: {order_id: id}})
  dispatch(UPDATE_LOADING_ACTION(false))
  if (result.code === '1') {
    dispatch(DELETE_ORDER_ACTION(index))
  } else {
    dispatch(showToast(result.msg || '取消失败'))
  }
}

export const deleteOrder = (id, status) => async dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  const result = await fetch(api.deleteOrder, {param: {order_id: id}})
  if (result.code === '1') {
    dispatch(getOrderList({current_page: 1, status}))
  } else {
    dispatch(UPDATE_LOADING_ACTION(false))
    dispatch(showToast(result.msg || '删除失败'))
  }
}
