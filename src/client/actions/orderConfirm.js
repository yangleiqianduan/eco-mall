import fetch from 'common/fetch'
import * as api from 'constants/api'

import {
  showToast,
  changeRouter,
  UPDATE_LOADING_ACTION
} from './index'

export const getConfirmList = data => async dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  const result = await fetch(api.confirmOrder, {method: 'post', param: data})
  if (!result) return false
  if (result.code === '1') {
    dispatch(UPDATE_CONFIRM_LIST_ACTION(result.data.buyOrderList))
    dispatch(UPDATE_CONFIRM_AMOUNT_ACTION(result.data.totalAmountInfo.totalAmount))
    dispatch(UPDATE_TOKEN_ACTION(result.data.token))
    dispatch(UPDATE_SOURCE_ACTION(data.source))
  } else {
    dispatch(UPDATE_LOADING_ACTION(false))
    dispatch(showToast(result.msg || '订单核对失败'))
  }
}

function transfer (data, currentAddress) {
  let newData = {}
  let tmplist = []
  newData.source = data.source
  newData.token = data.token
  newData.deliver_address_id = currentAddress.id
  newData.products = []
  tmplist = data.itemsList.filter(item => item.canBuy)
  let nl = []
  let len = tmplist.length
  let obj = {}
  for (let i = 0; i < len; i++) {
    let tmpObj = tmplist[i]
    if (!obj[tmpObj.merchantCode]) {
      nl.push({mcode: tmpObj.merchantCode, sku_list: [{sku_id: tmpObj.itemInfo.skuId, buy_count: tmpObj.itemInfo.quantity}]})
      obj[tmpObj.merchantCode] = tmpObj
    } else {
      for (let j = 0; j < nl.length; j++) {
        var tmpObj2 = nl[j]
        if (tmpObj2.mcode === tmpObj.merchantCode) {
          tmpObj2.sku_list.push({sku_id: tmpObj.itemInfo.skuId, buy_count: tmpObj.itemInfo.quantity})
          break
        }
      }
    }
  }
  newData.products = nl
  return newData
}
export const submitOrder = (data, currentAddress) => async dispatch => {
  if (!currentAddress) {                      // 没有收货地址时 跳到增加收货地址页
    return dispatch(changeRouter('/address'))
  }
  dispatch(UPDATE_LOADING_ACTION(true))
  const transData = transfer(data, currentAddress)
  const result = await fetch(api.submitOrder, {method: 'post', param: transData})
  if (result.code === '1') {
    dispatch(UPDATE_LOADING_ACTION(false))
    window.location = '//' + result.data.toCashierRedirectUrl
  } else {
    dispatch(UPDATE_LOADING_ACTION(false))
    dispatch(showToast(result.msg || '提交订单失败'))
  }
}

export const SET_ADDRESS_ID = 'SET_ADDRESS_ID'
export const SET_ADDRESS_ID_ACTION = payload => ({
  type: SET_ADDRESS_ID,
  payload
})

export const UPDATE_CONFIRM_LIST = 'UPDATE_CONFIRM_LIST'
export const UPDATE_CONFIRM_LIST_ACTION = (payload) => ({
  type: UPDATE_CONFIRM_LIST,
  payload
})

export const UPDATE_CONFIRM_AMOUNT = 'UPDATE_CONFIRM_AMOUNT'
export const UPDATE_CONFIRM_AMOUNT_ACTION = (payload) => ({
  type: UPDATE_CONFIRM_AMOUNT,
  payload
})

export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const UPDATE_TOKEN_ACTION = (payload) => ({
  type: UPDATE_TOKEN,
  payload
})

export const UPDATE_SOURCE = 'UPDATE_SOURCE'
export const UPDATE_SOURCE_ACTION = (payload) => ({
  type: UPDATE_SOURCE,
  payload
})
