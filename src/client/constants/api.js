// 用户信息
// export const userInfo = '/m/user/buyer/get_info'
export const login = '/m/login'

// 首页
export const getCollocationList = '/m/product/mix/list'                   // 获取搭配列表
export const getHotItems = '/m/product/recommend/list'                    // 获取推荐商品
export const getCategoryList = '/m/category/list'                         // 获取类目列表
export const getBanner = '/m/banner/get_list'                             // 获取banner列表

// 商品列表页
export const getItems = '/m/product/search/list'                          // 获取商品列表

// 需要页面
export const upload = '/m/product/image/upload'                           // 图片上传
export const submitRequire = '/m/product/want/commit'                     // 提交想要买什么

// 购物车
export const getShoppingcartItems = '/m/user/cart/get'                    // 获取购物车列表
export const updateShoppingcartItemNumer = '/m/user/cart/modify_quantity' // 修改购物车商品数量
export const deleteShoppingcartItem = '/m/user/cart/remove'               // 删除购物车商品

// 商品详情
export const itemDetail = '/m/product/detail'                             // 商品详情

// 搭配详情
export const collocation = '/m/product/mix/details'                       // 获取搭配详情

// 确定预约
export const conformOrder = '/m/product/appoint/create'                   // 确定预约

// 收货地址
export const getAddressList = '/m/user/deliver_address/get_list'          // 获取收货地址列表
export const deleteAddress = '/m/user/deliver_address/delete'             // 删除收货地址
export const getArea = '/m/lbs/get_cities'                                // 获取省、市、县列表
export const addAddress = '/m/user/deliver_address/add'                   // 新增收货地址
export const editAddress = '/m/user/deliver_address//modify'              // 编辑收货地址
export const setDefault = '/m/user/deliver_address/set_default'           // 设为默认地址

// 订单列表
export const getOrderList = '/m/order/get'                                // 获取订单列表
export const cancelOrder = '/m/order/cancel'                              // 取消订单
export const deleteOrder = '/m/order/delete'                              // 删除订单

// 订单详情
export const getOrderDetail = '/m/order/detail'                           // 获取订单详情

// 核对订单
export const confirmOrder = '/m/order/confirm'                            // 核对订单信息

// 投票
export const getVoteList = '/m/vote/get_vote_list'                        // 获取投票列表
export const voteSelects = '/m/vote/select_vote'                          // 投票选项
export const voteResult = '/m/vote/stats_vote_result'                     // 投票结果
export const voteSave = '/m/vote/save'                                    // 投票提交

export const host = {
  // dev: 'http://10.33.69.91:8050',
  // dev: 'http://10.33.69.182:8050',
  // dev: 'http://lmall.lianjia.com:8070',
  dev: 'http://mall.lj-web-30.lianjia.com',
  // dev: 'http://10.33.66.18:8050',
  offline: 'http://mall.lj-web-30.lianjia.com',
  prod: 'https://mall.lianjia.com'
}
