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

    case actions.UPDATE_CATEGORY:
      return state.merge({
        categoryList: action.payload
      })

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
  categoryList: [
    {'categoryId': 100, 'categoryName': '个人成长'},
    {'categoryId': 101, 'categoryName': '个人成长'},
    {'categoryId': 122, 'categoryName': '报买普商'}
  ],
  transRoute: {
    to: ''
  }
})
