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
    case actions.UPDATE_BANNER:
      return state.merge({banner: action.payload})
    default:
      return state
  }
}

const protocol = window.location.protocol

const initState = {
  banner: [],
  wantList: [
    {img_url: protocol + '//image1.ljcdn.com/lmall/b551e907-367f-47e1-a903-096b34630ca8.png.624x336.png', redirect_url: '/voteList'},
    {img_url: protocol + '//image1.ljcdn.com/lmall/ea20ee01-f886-435c-9689-f8d54a8489c8.png.624x336.png', redirect_url: '/want'}
  ],
  collocation: [],    // {picture, productMixDescription, productMixId, productMixName}
  hotItems: []        // {firstPageUrl, marketPrice, productId, productName}
}
