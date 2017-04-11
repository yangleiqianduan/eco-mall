import { fromJS } from 'immutable'
import * as actions from 'actions/index'

export default (state = initState, action) => {
  switch (action.type) {
    case actions.CHANGE_ROUTER:
      return state.merge({
        transRoute: action.payload
      })

    case actions.UPDATE_LOADING:
      return state.merge({
        loading: !!action.payload
      })

    case actions.UPDATE_USER:
      return state.merge({
        userInfo: action.payload
      })

    case actions.SHOW_SEARCH:
      return state.merge({
        showSearch: action.payload
      })

    case actions.UPDATE_MODAL:
      return state.merge({
        modal: action.payload
      })

    case actions.UPDATE_ORDER_COUNT:
      return state.update('orderCounts', h => h.map(o => o.set('count', (action.payload.filter(bo => bo.code === o.get('status'))[0] || {count: 0}).count)))

    case actions.UPDATE_SHOPCART_COUNT:
      return state.set('shoppingCartCount', action.payload)

    default:
      return state
  }
}

const initState = fromJS({
  loading: false,
  loaded: {},
  userInfo: {},
  modal: {
    show: false,
    overlap: true,
    onSure: () => {},
    onCancel: () => {},
    onClose: () => {},
    type: 'alert',
    title: '提示',
    text: ''
  },
  transRoute: {
    to: ''
  }
})
