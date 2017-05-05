import fetch from 'common/fetch'
import * as api from 'constants/api'

import {
  showToast,
  UPDATE_LOADING_ACTION,
  changeRouter
} from './index'
import {
  initAddress
} from './address'

export const UPDATE_LIST = 'UPDATE_LIST_ADDRESS_LIST'
export const UPDATE_LIST_ACTION = (payload) => ({
  type: UPDATE_LIST,
  payload
})

export const getAddressList = data => async dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  const result = await fetch(api.getAddressList, {param: {uid: '1000000010098260'}})
  dispatch(UPDATE_LOADING_ACTION(false))
  if (result.code === '1') {
    dispatch(UPDATE_LIST_ACTION(result.data || []))
  } else {
    showToast(result.msg || '获取列表失败')
  }
}

export const toEditAddress = payload => dispatch => {
  dispatch(initAddress(payload))
  dispatch(changeRouter('/address'))
}

export const deleteAddress = id => async dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  const result = await fetch(api.deleteAddress, {param: {deliver_address_id: id, uid: 1000000010098260}})
  if (result.code === '1') {
    dispatch(getAddressList())
  } else {
    dispatch(UPDATE_LOADING_ACTION(false))
    dispatch(showToast(result.msg || '删除失败'))
  }
}

export const setDefault = (id) => async dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  const result = await fetch(api.setDefault, {param: {deliver_address_id: id, uid: 1000000010098260}, method: 'post', formData: true})
  if (result.code === '1') {
    dispatch(getAddressList())
  } else {
    dispatch(UPDATE_LOADING_ACTION(false))
    dispatch(showToast(result.msg || '设置失败'))
  }
}
