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
    const data = res.data || {productInfo: []}
    // 将初始状态置为全部选中
    data.productInfo = data.productInfo.map((item) => Object.assign(item, {checked: true}))
    dispatch(UPDATE_DETAIL_ACTION(data))
  })
}

export const CHECK_ALL = 'CHECK_ALL_COLLOCATION'
export const CHECK_ALL_ACTION = (payload) => ({
  type: CHECK_ALL,
  payload
})

export const CHECK_ITEM = 'CHECK_ITEM_COLLOCATION'
export const CHECK_ITEM_ACTION = (payload) => ({
  type: CHECK_ITEM,
  payload
})
