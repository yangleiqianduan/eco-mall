import fetch from 'common/fetch'
import * as api from 'constants/api'

export const UPDATE_DETAIL = 'UPDATE_DETAIL_COLLOCATION'
export const UPDATE_DETAIL_ACTION = (payload) => ({
  type: UPDATE_DETAIL,
  payload
})

// 获取搭配详情
export const getDetail = data => dispatch => {
  fetch(api.collocation, {param: data})
  .then(res => {
    dispatch(UPDATE_DETAIL_ACTION(
      res.data || {}
    ))
  })
}
