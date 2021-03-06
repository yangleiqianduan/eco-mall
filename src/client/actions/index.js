import fetch from 'common/fetch'
import * as api from 'constants/api'
import { delay } from 'common/utils'

// 更新Loading遮罩状态
export const UPDATE_LOADING = 'UPDATE_LOADING'
export const UPDATE_LOADING_ACTION = (payload) => ({
  type: UPDATE_LOADING,
  payload
})

// 更新用户信息
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_ACTION = (payload) => ({
  type: UPDATE_USER,
  payload
})

// 更新路由状态，包括路由跳转等
export const CHANGE_ROUTER = 'CHANGE_ROUTER'
export const CHANGE_ROUTER_ACTION = (payload) => ({
  type: CHANGE_ROUTER,
  payload
})

export const changeRouter = payload => async dispatch => {
  await dispatch(CHANGE_ROUTER_ACTION(typeof payload === 'string' ? {to: payload, push: true} : payload))
  await dispatch(CHANGE_ROUTER_ACTION({to: undefined}))
}

export const UPDATE_MODAL = 'UPDATE_MODAL'
export const UPDATE_MODAL_ACTION = (payload) => ({
  type: UPDATE_MODAL,
  payload
})

export const alert = data => dispatch => {
  dispatch(UPDATE_MODAL_ACTION(Object.assign({
    onSure: () => dispatch(UPDATE_MODAL_ACTION({show: false})),
    onCancel: () => dispatch(UPDATE_MODAL_ACTION({show: false})),
    onClose: () => dispatch(UPDATE_MODAL_ACTION({show: false})),
    type: 'alert',
    show: true
  }, typeof data === 'string' ? {text: data, show: true} : data)))
}

export const UPDATE_CATEGPRYLIST = 'UPDATE_CATEGPRYLIST_SHARED'
export const UPDATE_CATEGPRYLIST_ACTION = (payload) => ({
  type: UPDATE_CATEGPRYLIST,
  payload
})

// 获取类目列表
export const getCateoryList = () => dispatch => {
  fetch(api.getCategoryList)
  .then(res => {
    dispatch(UPDATE_CATEGPRYLIST_ACTION((res || {}).data || []))
  })
}

export const UPDATE_USERINFO = 'UPDATE_USERINFO_SHARED'
export const UPDATE_USERINFO_ACTION = (payload) => ({
  type: UPDATE_USERINFO,
  payload
})
// 获取用户信息
export const getUserInfo = () => dispatch => {
  fetch(api.userInfo)
  .then(res => {
    if (res) {
      dispatch(UPDATE_USERINFO_ACTION((res || {}).data || {}))
    }
  })
}

export const UPDATE_TOAST = 'UPDATE_TOAST_SHARED'
export const UPDATE_TOAST_ACTION = (payload) => ({
  type: UPDATE_TOAST,
  payload
})

export const showToast = data => async dispatch => {
  await dispatch(UPDATE_TOAST_ACTION({show: true, text: data}))
  await delay(1)
  await dispatch(UPDATE_TOAST_ACTION({show: false, text: ''}))
}

// 预约
export const confirmOrder = data => dispatch => {
  dispatch(UPDATE_LOADING_ACTION(true))
  fetch(api.conformOrder, {method: 'post', param: data})
  .then(res => {
    if (res.code === '1' && res.success) {
      dispatch(UPDATE_LOADING_ACTION(false))
      dispatch(changeRouter('success'))
    }
  })
}

export const UPDATE_CART_COUNT = 'UPDATE_CART_COUNT_SHARED'
export const UPDATE_CART_COUNT_ACTION = (payload) => ({
  type: UPDATE_CART_COUNT,
  payload
})

// 获取购物车条数
export const getCartCount = () => dispatch => {
  fetch(api.getCartCount)
  .then(res => {
    if (res.code === '1') {
      dispatch(UPDATE_CART_COUNT_ACTION(res.data.user_cart_count))
    }
  })
}

export const UPDATE_ORDER_COUNT = 'UPDATE_ORDER_COUNT_SHARED'
export const UPDATE_ORDER_COUNT_ACTION = (payload) => ({
  type: UPDATE_ORDER_COUNT,
  payload
})
// 获取订单条数
export const getOrderCount = () => dispatch => {
  fetch(api.getOrderCount)
  .then(res => {
    if (res.code === '1' && res.data && res.data.length > 0) {
      dispatch(UPDATE_ORDER_COUNT_ACTION(res.data))
    }
  })
}
