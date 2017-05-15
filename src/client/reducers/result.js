import { fromJS } from 'immutable'
import * as actions from 'actions/result'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_ITEM_LIST:
      return state.merge({list: action.payload})
    case actions.UPDATE_PAGE:
      return state.update('page', page => page.merge(action.payload.page))
    default:
      return state
  }
}

const initState = {
  list: [],         // {firstPageUrl, marketPrice, productId, productName}
  page: {
    current_page: 1,
    page_size: 10
  }
}
