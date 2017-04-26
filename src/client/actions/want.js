import fetch from 'common/fetch'
import * as api from 'constants/api'

import {
  UPDATE_LOADING_ACTION,
  changeRouter,
  showToast
} from './index'

// 更新输入文字
export const UPDATE_TEXT = 'UPDATE_TEXT_WANT'
export const UPDATE_TEXT_ACTION = (payload) => ({
  type: UPDATE_TEXT,
  payload
})

// 添加图片
export const ADD_IMAGE = 'ADD_IMAGE_WANT'
export const ADD_IMAGE_ACTION = (payload) => ({
  type: ADD_IMAGE,
  payload
})

// 删除图片
export const DEL_IMAGE = 'DEL_IMAGE_WANT'
export const DEL_IMAGE_ACTION = (payload) => ({
  type: DEL_IMAGE,
  payload
})

// 提交数据
export const submit = data => dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  fetch(api.submitRequire, {method: 'post', param: data})
  .then(res => {
    dispatch(UPDATE_LOADING_ACTION(false))
    if (res.code === '1') {
      dispatch(showToast('提交成功'))
      // dispatch(changeRouter('/vote'))
      window.history.back()
    } else {
      dispatch(showToast('提交失败'))
    }
  })
}
