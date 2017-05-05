import fetch from 'common/fetch'
import * as api from 'constants/api'

// 更新推荐商品
export const UPDATE_HOT_ITEM = 'UPDATE_HOT_ITEM_HOME'
export const UPDATE_HOT_ITEM_ACTION = (payload) => ({
  type: UPDATE_HOT_ITEM,
  payload
})

// 更新搭配列表
export const UPDATE_COLLOCATION = 'UPDATE_COLLOCATION_HOME'
export const UPDATE_COLLOCATION_ACTION = (payload) => ({
  type: UPDATE_COLLOCATION,
  payload
})

export const getCollocationList = () => dispatch => {
  fetch(api.getCollocationList)
  .then(res => {
    dispatch(UPDATE_COLLOCATION_ACTION((res || {}).data || []))
  })
}

// 更新推荐商品
export const UPDATE_HOT_ITEMS = 'UPDATE_HOT_ITEMS_HOME'
export const UPDATE_HOT_ITEMS_ACTION = (payload) => ({
  type: UPDATE_HOT_ITEMS,
  payload
})

export const getHotItems = () => dispatch => {
  fetch(api.getHotItems)
  .then(res => {
    dispatch(UPDATE_HOT_ITEMS_ACTION((res || {}).data || []))
  })
}

export const UPDATE_BANNER = 'UPDATE_BANNER_HOME'
export const UPDATE_BANNER_ACTION = (payload) => ({
  type: UPDATE_BANNER,
  payload
})

export const getBanner = () => dispatch => {
  fetch(api.getBanner)
  .then(res => {
    dispatch(UPDATE_BANNER_ACTION(((res || {}).data || []).filter(b => b.location === 10)))
  })
}
