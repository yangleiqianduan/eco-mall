/*
*  数据上报统计
*  type:      上报类型，pv/uv
*  category:  监控目标名称
*  action:    交互行为
*  label:     事件额外信息（可选）
*  value:     事件数值信息（可选）
*/
export const stat = (type, category, action, label, value) => {
  if (_hmt && _hmt !== null && _hmt !== undefined) {
    switch (type) {
      case 'pv':
        _hmt.push(['_trackPageview', '/vote'])
        break
      case 'uv':
        _hmt.push(['_trackEvent', category, action, label, value])
        break
      default:
        break
    }
  }
}
