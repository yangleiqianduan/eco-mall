import fetch from 'common/fetch'
import * as api from 'constants/api'

import {
  UPDATE_LOADING_ACTION,
  changeRouter
} from './index'

// 更新投票结果选项
export const UPDATE_VOTE_RESULT = 'UPDATE_VOTE_RESULT'
export const UPDATE_VOTE_RESULT_ACTION = (payload) => ({
  type: UPDATE_VOTE_RESULT,
  payload
})

// 获取数据
export const getVoteResult = (vote_id) => dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  fetch(api.voteResult, {param: {
    vote_id: vote_id || 1,
    user_id: localStorage.getItem('user_id') || ''
  }})
  .then(res => {
    dispatch(UPDATE_LOADING_ACTION(false))
    if (res.code === '1') {
      dispatch(UPDATE_VOTE_RESULT_ACTION(res.data || null))
    } else {
      dispatch(showToast(res.msg || '接口有误，返回数据格式错误'))
    }
  })
  .catch(e => {
    dispatch(showToast('返回数据格式错误'))
    dispatch(UPDATE_LOADING_ACTION(false))
  })
}
