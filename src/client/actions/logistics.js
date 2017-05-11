import fetch from 'common/fetch'
import * as api from 'constants/api'

import {
  showToast,
  UPDATE_LOADING_ACTION
} from './index'

export const UPDATE_LOGISTICS_LIST = 'UPDATE_LOGISTICS_LIST'
export const UPDATE_LOGISTICS_LIST_ACTION = (payload) => ({
  type: UPDATE_LOGISTICS_LIST,
  payload
})

export const getLogisticsList = param => async dispatch => {
  // dispatch(UPDATE_LOADING_ACTION(true))
  // const result = await fetch(api.getOrderDetail, {param})
  // dispatch(UPDATE_LOADING_ACTION(false))
  // if(result.code === '1') {
  //   dispatch(UPDATE_LOGISTICS_LIST_ACTION(result.data || {}))
  // } else {
  //   dispatch(showToast(result.msg || '获取物流列表失败'))
  // }
}
