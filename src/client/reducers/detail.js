import { fromJS } from 'immutable'
import * as actions from 'actions/detail'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.TO_INIT:
      return fromJS(initState)
    case actions.UPDATE_ITEM_DETAIL:
      return state.merge({reqData: action.payload})
    default:
      return state
  }
}

const initState = {
  reqData: {
    product_id: '',
    product_code: '',
    product_name: '',
    product_type: '',
    product_status: '',
    category_id: '',
    district_code: '',
    currency: '',
    product_desc: '',
    merchant_name: '',
    merchant_code: '',
    merchant_url: '',
    validity_start_time: '',
    validity_end_time: '',
    per_user_limit: '',
    per_order_limit: '',
    product_image_info: {},
    product_price_info: {},
    delivery_method_info: {},
    product_attribute_info: {
      sku_attribute_info: [],
      spu_attribute_info: [],
      brand_info: ''
    },
    product_inv_info: {                                 // sku 库存 对应
      sku_inv: {}
    },
    presell_info: [],                                   // 预售信息
    service_assurance_info: [],
    sale_amount_info: {},
    sku_attribute_mapping_sku_id: {},
    product_paymethod_info: {},
    added_product_num: '',
    user_purchased_num: '',
    guarantee_time: '',
    pre_sale_msg: '',
    delivery_msg: '',
    delivery_city: ''
  }
}
