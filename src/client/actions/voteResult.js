import fetch from 'common/fetch'
import * as api from 'constants/api'
import * as Utils from 'common/utils'

import {
  UPDATE_LOADING_ACTION,
  changeRouter,
  showToast
} from './index'

// 更新投票结果选项
export const UPDATE_VOTE_RESULT = 'UPDATE_VOTE_RESULT'
export const UPDATE_VOTE_RESULT_ACTION = (payload) => ({
  type: UPDATE_VOTE_RESULT,
  payload
})

// 获取数据
export const getVoteResult = (vote_id, cb) => async dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  const res = await fetch(api.voteResult, {param: {
    vote_id: vote_id || 1,
    user_id: Utils.getCookie('lianjia_mall_vote_user_id') || ''
  }})
  .catch(e => {
    dispatch(showToast('返回数据格式错误'))
    dispatch(UPDATE_LOADING_ACTION(false))
  })
  dispatch(UPDATE_LOADING_ACTION(false))
  if (res.code === '1') {
    await dispatch(UPDATE_VOTE_RESULT_ACTION(res.data || null))
    if (typeof cb === 'function') {
      cb()
    }
  } else {
    dispatch(showToast(res.msg || '接口有误，返回数据格式错误'))
  }
}
