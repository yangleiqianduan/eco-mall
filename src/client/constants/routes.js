import Home from 'containers/Home/'
import Detail from 'containers/Detail/'
import Subject from 'containers/Subject/'
import Result from 'containers/Result/'
import Collocation from 'containers/Collocation/'
import Success from 'containers/Success/'
import Shoppingcart from 'containers/Shoppingcart/'
import AddressList from 'containers/AddressList/'
import Address from 'containers/Address/'
import OrderList from 'containers/OrderList/'
import Order from 'containers/Order/'
import Want from 'containers/Want/'
import Vote from 'containers/Vote/'
import VoteResult from 'containers/VoteResult/'
import ErrorPage from 'containers/ErrorPage'
import Icons from 'components/Icons/demo/'

export default [
  {
    path: '/',
    exact: true,
    component: Home,
    title: '链家·优品'
  },
  {
    path: '/search',
    exact: true,
    component: Result,
    title: '优品目录'
  },
  {
    path: '/item',
    exact: true,
    component: Detail,
    title: '商品详情'
  },
  {
    path: '/collocation',
    exact: true,
    component: Collocation,
    title: '搭配详情'
  }, {
    path: '/subject',
    exact: true,
    component: Subject,
    title: '专题'
  },
  {
    path: '/shoppingcart',
    exact: true,
    component: Shoppingcart,
    title: '购物车'
  },
  {
    path: '/addressList',
    exact: true,
    component: AddressList,
    title: '地址管理'
  },
  {
    path: '/address',
    exact: true,
    component: Address,
    title: '新建地址'
  },
  {
    path: '/orderList',
    exact: true,
    component: OrderList,
    title: '订单列表'
  },
  {
    path: '/order',
    exact: true,
    component: Order,
    title: '订单详情'
  },
  {
    path: '/want',
    exact: true,
    component: Want,
    title: '需求登记'
  },
  {
    path: '/success',
    exact: true,
    component: Success,
    title: '预约成功'
  },
  {
    path: '/vote',
    exact: true,
    component: Vote,
    title: '投票'
  },
  {
    path: '/voteResult',
    exact: true,
    component: VoteResult,
    title: '投票结果'
  },
  {
    path: '/errorPage',
    exact: true,
    component: ErrorPage,
    title: '错误'
  },
  {
    path: '/icon',
    exact: true,
    component: Icons,
    title: 'icon示例'
  }
]
