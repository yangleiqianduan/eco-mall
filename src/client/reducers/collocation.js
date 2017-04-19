import { fromJS } from 'immutable'
import * as actions from 'actions/collocation'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_DETAIL:
      return state.merge(action.payload)
    case actions.CHECK_ALL:
      return state.update('productInfo', items => items.map(item => item.set('checked', action.payload)))
    case actions.CHECK_ITEM:
      return state.updateIn(['productInfo', action.payload, 'checked'], checked => !checked)
    default:
      return state
  }
}

const initState = {
  productMixName: '',
  pictureUrl: '',
  productMixDescription: '',
  productInfo: []
}
