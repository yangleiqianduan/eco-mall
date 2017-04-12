// 用户信息
export const userInfo = '/web/user/buyer/get_info'

// 首页
export const categoryList = '/web/category/get_list'
export const categoryItems = '/web/product/new_hot_sale'                    // param: category_id new_amount新建商品数量 hot_amount热销商品数量
export const adImages = '/web/banner/get'                                   // param: location 10轮播 20子广告 30类目

// 二手列表
export const getSecondItems = '/web/product/second_hand'                    // param: 分页参数

// 搜索页
export const getItems = '/web/product/search'

// 商品
export const getItemDetail = '/web/product/detail'                          // param: product_id商品id
export const addToCart = '/web/user/cart/add'                               // 添加到购物车

// 个人中心-首页
export const getLevel = '/web/user/vip_level'                               // 获取用户等级

// 收货地址
export const getCitys = '/web/lbs/get_cities'                               // 获取省、市
export const getAddresses = '/web/user/deliver_address/get_list'            // 获取地址列表
export const createAddress = '/web/user/deliver_address/add'                // 新增地址
export const updateAddress = '/web/user/deliver_address/modify'             // 编辑保存地址
export const setDefault = '/web/user/deliver_address/set_default'           // 设为默认地址
export const deleteAddress = '/web/user/deliver_address/delete'             // 删除收货地址

// 我的链家币
export const getCoins = '/web/user/account/get_lcoin_balance'
export const getLog = '/web/user/account/get_fund_flow_detail'              // 获取用户交易记录

// 评价
export const commentPrview = '/web/comment/product/get_show_comment'        // param: productId商品id
export const commentList = '/web/comment/product/get_item_comment'          // param: productId商品id grade评价等级 1：好评  2：中评  3：差评 current_page分页

// 订单列表
export const getOrderCount = '/web/order/status_count_list'                 // 分类获取订单数
export const getOrderList = '/web/order/get'                                // 获取订单列表 param: status订单状态 order_id订单id current_page当前页 page_size
export const cancelOrder = '/web/order/cancel'                              // 删除订单 param: order_id订单id

// 订单详情
export const orderDetail = '/web/order/detail'                              // 获取订单详情
export const payOrder = '/web/order/pay/redirect'                           // 去支付页
export const confirmDelivery = '/web/order/confirm_delivery'                // 确认收货

// 评价
export const getComments = '/web/comment/product/get_user_comment'          // 获取评价列表
export const getCommentItem = '/web/comment/product/get_order_comment_list' // 按照订单id获取评价商品
export const submitComment = '/web/comment/product/save_user_comment'       // 提交评价(商品)

// 购物车
export const shoppingCartCount = '/web/user/cart/count'                     // 获取购物车商品总数
export const shoppingCart = '/web/user/cart/get'

// 删除购物车
export const deleteCart = '/web/user/cart/remove'

// 添加减少商品数量
export const addMinus = '/web/user/cart/modify_quantity'

// 立即购买页
export const instantBuy = '/web/order/confirm'
// window.ENV = window.ENV

// 创建订单
export const createOrder = '/web/order/create'

// 增加减少物品数量
export const numCount = '/web/user/cart/modify_quantity'

// 售后列表
export const afterSales = '/web/order/aftersales/get_list'

// 取消详情
export const cancelDetail = '/web/order/aftersales/cancel'

// 售后详情
export const applyAfterSales = '/web/order/aftersales/apply'

// 上传图片
export const upload = '/web/file/image/upload'

// 提交申请
export const submitAfterSales = '/web/order/aftersales/commit/'

// 售后详情
export const afterSalesDetails = '/web/order/aftersales/get_detail'

// 退款下拉
export const refundList = '/web/order/aftersales/get_base_info'

// 修改价格
export const expressPrice = '/web/order/count_money'

export const host = {
  dev: 'http://lmallbuyer.test.lianjia.com:8971',
  // dev: 'http://lmall.lianjia.com:8070',
  prod: ''
}
