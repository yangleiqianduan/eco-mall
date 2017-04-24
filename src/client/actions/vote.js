import fetch from 'common/fetch'
import * as api from 'constants/api'

import {
  UPDATE_LOADING_ACTION,
  changeRouter
} from './index'

export const SELECT_ITEM = 'SELECT_ITEM'
export const selectItem = (payload) => ({
  type: SELECT_ITEM,
  payload
})

export const SEND_CHOOSE = 'SEND_CHOOSE'
export const sendChoose = data => dispatch => {
  console.log(data)
  dispatch(UPDATE_LOADING_ACTION(true))
  fetch(api.itemDetail, {param: {
    choose: data
  }})
  .then(res => {
    if (!res) return dispatch(UPDATE_LOADING_ACTION(false))
    dispatch(changeRouter('/voteResult'))
    dispatch(UPDATE_LOADING_ACTION(false))
  })
  .catch(e => {
    console.log('返回数据格式错误')
    dispatch(UPDATE_LOADING_ACTION(false))
  })
}
