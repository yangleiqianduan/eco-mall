import fetch from 'common/fetch'
import * as api from 'constants/api'

import {
  showToast,
  UPDATE_LOADING_ACTION
} from './index'

export const UPDATE_ORDER_DETAIL = 'UPDATE_ORDER_DETAIL_ORDERLIST'
export const UPDATE_ORDER_DETAIL_ACTION = (payload) => ({
  type: UPDATE_ORDER_DETAIL,
  payload
})

export const getOrderDetail = id => async dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  const result = await fetch(api.getOrderDetail, {param:{order_id:id}})
  dispatch(UPDATE_LOADING_ACTION(false))
  if(result.code === '1') {
    // dispatch(UPDATE_ORDER_DETAIL_ACTION(result.data || {}))
  } else {
    dispatch(showToast(result.msg || '获取订单详情失败'))
  }
}
