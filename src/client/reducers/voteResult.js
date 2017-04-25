import { fromJS } from 'immutable'
import * as actions from 'actions/voteResult'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_VOTE_RESULT:
      return state.merge({
        coverImage: action.payload.coverImage,
        title: action.payload.title,
        description: action.payload.description,
        list: action.payload.voteQuestion
      })
    default:
      return state
  }
}

const initState = {
}
