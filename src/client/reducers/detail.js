import { fromJS } from 'immutable'
import * as actions from 'actions/detail'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
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
  },
  ensureInfo: [
    {
      type: 1,
      icon: 'ensureTag1',
      tit: '7天发货',
      info: '链家承诺，非定制商品，下订单次日起7日内发货'
    },
    {
      type: 2,
      icon: 'ensureTag2',
      tit: '送货入户',
      info: '链家承诺，所有商品均送货入户'
    },
    {
      type: 3,
      icon: 'ensureTag3',
      tit: '送货上门取件',
      info: '所有商品30天试用无理由退货，并上门取件退款'
    }
  ]

}
