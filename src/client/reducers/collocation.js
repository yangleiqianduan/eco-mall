import { fromJS } from 'immutable'
import * as actions from 'actions/detail'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_Detail:
      return state.merge(action.payload)
    default:
      return state
  }
}

const initState = {
  productMixName: '安心一隅',
  pictureUrl: 'http://img.ljcdn.com/lmall/18b79305-e61b-46cc-bc69-a296a7f1b4e9.jpg',
  productMixDescription: '一杯茶，一盏灯',
  productInfo: []
}
