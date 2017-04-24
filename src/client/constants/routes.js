import Home from 'containers/Home/'
import Detail from 'containers/Detail/'
import Subject from 'containers/Subject/'
import Result from 'containers/Result/'
import Collocation from 'containers/Collocation/'
import Want from 'containers/Want/'
import Success from 'containers/Success/'
import Vote from 'containers/Vote/'

import Icons from 'components/Icons/demo/'

export default [
  {
    path: '/',
    exact: true,
    component: Home,
    title: '链家·优品'
  }, {
    path: '/search',
    exact: true,
    component: Result,
    title: '优品目录'
  }, {
    path: '/item',
    exact: true,
    component: Detail,
    title: '商品详情'
  }, {
    path: '/collocation',
    exact: true,
    component: Collocation,
    title: '搭配详情'
  }, {
    path: '/subject',
    exact: true,
    component: Subject,
    title: '专题'
  }, {
    path: '/want',
    exact: true,
    component: Want,
    title: '需求登记'
  }, {
    path: '/success',
    exact: true,
    component: Success,
    title: '预约成功'
  },
  {
    path: '/vote',
    exact: true,
    component: Vote,
    title: '预约成功'
  },
  {
    path: '/icon',
    exact: true,
    component: Icons,
    title: 'icon示例'
  }
]
