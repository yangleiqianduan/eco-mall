/*
*  数据上报统计
*  type:      上报类型，pv/uv
*  category:  监控目标名称
*  action:    交互行为
*  label:     事件额外信息（可选）
*  value:     事件数值信息（可选）
*/
export const stat = (type, category, action, label, value) => {
  if (window._hmt && window._hmt !== null && window._hmt !== undefined) {
    switch (type) {
      case 'pv':
        if (!parseName[category]) return false
        window._hmt.push(['_trackEvent', parseName[category], 'pv', category])
        break
      case 'event':
        window._hmt.push(['_trackEvent', category, action, label, value])
        break
      default:
        break
    }
  }
}

const parseName = {                     // 需要统计pv的页面
  '链家·优品': 'mall_home',
  '优品目录': 'mall_product_list',
  '商品详情': 'mall_product_detail',
  '需求登记': 'mall_want_buy',
  '投票': 'mall_vote_detail',
  '投票结果': 'mall_vote_result'
}
