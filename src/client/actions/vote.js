import fetch from 'common/fetch'
import * as api from 'constants/api'

import {
  UPDATE_LOADING_ACTION,
  changeRouter,
  showToast
} from './index'

// 更新投票选项
export const UPDATE_VOTE_OPTIONS = 'UPDATE_VOTE_OPTIONS'
export const UPDATE_VOTE_OPTIONS_ACTION = payload => ({
  type: UPDATE_VOTE_OPTIONS,
  payload
})

// 获取数据
export const getVoteOptions = voteId => dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  fetch(api.voteSelects, {param: {
    vote_id: voteId || 1
  }}, false)
  .then(res => {
    if (!res) return dispatch(UPDATE_LOADING_ACTION(false))
    if (res.code !== '1') {
      dispatch(UPDATE_LOADING_ACTION(false))
      dispatch(changeRouter('/errorPage?error_msg=' + res.msg))
    } else {
      if (res.data.title) document.title = res.data.title
      dispatch(UPDATE_VOTE_OPTIONS_ACTION(res.data || null))
      dispatch(UPDATE_LOADING_ACTION(false))
    }
  }).catch(e => {
    console.log('返回数据格式错误')
    dispatch(UPDATE_LOADING_ACTION(false))
  })
}

// 选择项目
export const SELECT_ITEM = 'SELECT_ITEM'
export const selectItem = (payload) => ({
  type: SELECT_ITEM,
  payload
})

// 提交投票选择
export const SEND_CHOOSE = 'SEND_CHOOSE'
export const sendChoose = data => dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  fetch(api.voteSave, {method: 'post',
    param: {
      vote_id: data.vote_id,
      user_id: data.user_id,
      choice_ids: data.choice_ids
    }})
  .then(res => {
    dispatch(UPDATE_LOADING_ACTION(false))
    if (res.code === '1') {
      dispatch(showToast('提交成功'))
      setTimeout(() => dispatch(changeRouter('/voteResult?vote_id=' + (data.vote_id || 1))), 1000)
    } else {
      dispatch(showToast(res.msg || '接口有误，提交失败'))
    }
  })
  .catch(e => {
    dispatch(showToast('返回数据格式错误'))
    dispatch(UPDATE_LOADING_ACTION(false))
  })
}
