import { fromJS } from 'immutable'
import * as actions from 'actions/collocation'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_DETAIL:
      return state.merge(action.payload)
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
