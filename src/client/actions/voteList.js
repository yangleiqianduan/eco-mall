import fetch from 'common/fetch'
import * as api from 'constants/api'

import {
  UPDATE_LOADING_ACTION,
  showToast
} from './index'

export const UPDATE_LIST = 'UPDATE_LIST_VOTELIST'
export const UPDATE_LIST_ACTION = (payload) => ({
  type: UPDATE_LIST,
  payload
})

export const getList = () => async dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  const result = await fetch(api.getVoteList)
  dispatch(UPDATE_LOADING_ACTION(false))
  if (result.code === '1') {
    dispatch(UPDATE_LIST_ACTION(result.data || []))
  } else {
    dispatch(showToast(result.msg))
  }
}
