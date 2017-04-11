
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
  await dispatch(CHANGE_ROUTER_ACTION(typeof payload === 'string' ? {to: payload} : payload))
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
    title: '提示'
  }, typeof data === 'string' ? {text: data, show: true} : data)))
}
