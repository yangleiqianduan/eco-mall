import { fromJS } from 'immutable'
import * as actions from 'actions/home'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_HOT_ITEM:
      return state.merge({data: action.payload})
    case actions.UPDATE_COLLOCATION:
      return state.merge({collocation: action.payload})
    case actions.UPDATE_HOT_ITEMS:
      return state.merge({hotItems: action.payload})
    default:
      return state
  }
}

const protocol = window.location.protocol

const initState = {
  banner: [
    {redirect_url: protocol + '//www.baidu.com', img_url: protocol + '//img.ljcdn.com/lmall/c1fd76ca-f6d3-4098-bae5-14f31540d0b1.jpg.738x392.jpg'},
    {img_url: protocol + '//img.ljcdn.com/lmall/5dd8d599-6d98-4055-8227-819373619cdb.jpg.738x392.jpg'},
    {img_url: protocol + '//img.ljcdn.com/lmall/18b79305-e61b-46cc-bc69-a296a7f1b4e9.jpg.738x392.jpg'}
  ],
  collocation: [],    // {picture, productMixDescription, productMixId, productMixName}
  hotItems: []        // {firstPageUrl, marketPrice, productId, productName}
}
