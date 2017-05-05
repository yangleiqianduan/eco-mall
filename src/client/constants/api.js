// 用户信息
export const userInfo = '/web/user/buyer/get_info'

// 首页
export const getCollocationList = '/m/product/mix/list'                   // 获取搭配列表
export const getHotItems = '/m/product/recommend/list'                    // 获取推荐商品
export const getCategoryList = '/web/category/list'                         // 获取类目列表
export const getBanner = '/web/banner/get'                                  // 获取banner列表

// 商品列表页
export const getItems = '/web/product/search/list'                          // 获取商品列表

// 需要页面
export const upload = '/web/product/image/upload'                           // 图片上传
export const submitRequire = '/m/product/want/commit'                       // 提交想要买什么

// 商品详情
export const itemDetail = '/web/product/detail'                             // 商品详情

// 搭配详情
export const collocation = '/web/product/mix/details'                       // 获取搭配详情

// 确定预约
export const conformOrder = '/web/product/appoint/create'                   // 确定预约

// 收货地址
export const getAddressList = '/web/user/deliver_address/get_list'          // 获取收货地址列表
export const deleteAddress = '/web/user/deliver_address/delete'             // 删除收货地址
export const getArea = '/web/lbs/get_cities'                                // 获取省、市、县列表
export const addAddress = '/web/user/deliver_address/add'                   // 新增收货地址
export const editAddress = '/web/user/deliver_address//modify'              // 编辑收货地址

// 订单列表
export const getOrderList = '/web/order/get'                                // 获取订单列表
export const cancelOrder = '/web/order/cancel'                              // 取消订单
export const deleteOrder = '/web/order/delete'                              // 删除订单

// 投票
export const voteSelects = '/m/vote/select_vote'                            // 投票选项
export const voteResult = '/m/vote/stats_vote_result'                       // 投票结果
export const voteSave = '/m/vote/save'                                      // 投票提交

export const host = {
  // dev: 'http://10.33.69.91:8050',
  // dev: 'http://10.33.69.182:8050',
  // dev: 'http://lmall.lianjia.com:8070',
  dev: 'http://mall.lj-web-30.lianjia.com',
  offline: 'http://mall.lj-web-30.lianjia.com',
  prod: 'https://mall.lianjia.com'
}
