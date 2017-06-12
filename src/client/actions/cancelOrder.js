import fetch from 'common/fetch'
import * as api from 'constants/api'
import { changeRouter } from 'actions/'

import {
  showToast,
  UPDATE_LOADING_ACTION
} from './index'

export const UPDATE_ORDER_DETAIL = 'UPDATE_ORDER_DETAIL'
export const UPDATE_ORDER_DETAIL_ACTION = (payload) => ({
  type: UPDATE_ORDER_DETAIL,
  payload
})

export const UPDATE_REMARK_VALUE = 'UPDATE_REMARK_VALUE'
export const UPDATE_REMARK_VALUE_ACTION = (payload) => ({
  type: UPDATE_REMARK_VALUE,
  payload
})

export const getOrderDetail = param => async dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  const result = await fetch(api.getOrderDetail, {param})
  dispatch(UPDATE_LOADING_ACTION(false))
  if(result.code === '1') {
    dispatch(UPDATE_ORDER_DETAIL_ACTION(result.data || {}))
  } else {
    dispatch(showToast(result.msg || '获取退款金额失败'))
  }
}

export const cancelOrder = (id, dec) => async dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  const result = await fetch(api.cancelOrderAfterPay, {param: {order_id: id, descr: dec}})
  if (result.code === '1') {
    dispatch(changeRouter('/order?order_id='+id))
  } else {
    dispatch(UPDATE_LOADING_ACTION(false))
    dispatch(showToast(result.msg || '取消失败'))
  }
}
