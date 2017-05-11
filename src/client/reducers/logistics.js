import { fromJS } from 'immutable'
import * as actions from 'actions/logistics'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_LOGISTICS_LIST:
      return state.merge({data: action.payload})
    default:
      return state
  }
}

const initState = {
  data: {
    isEnd: true,
    list: [
      {
        content:'已签收',
        time:'2017-12-1 16:32'
      },
      {
        content:'凭取件码到辅道大厦一层领取',
        time:'2017-12-1 16:32'
      },
      {
        content:'凭取件码到辅道大厦一层领取',
        time:'2017-12-1 16:32'
      },
      {
        content:'凭取件码到辅道大厦一层领取',
        time:'2017-12-1 16:32'
      }
    ]
  }
}
