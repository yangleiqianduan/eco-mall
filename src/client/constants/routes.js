// import Home from 'containers/Home/'
// import Detail from 'containers/Detail/'
// import Subject from 'containers/Subject/'
// import Result from 'containers/Result/'
// import Collocation from 'containers/Collocation/'
// import Success from 'containers/Success/'
// import Shoppingcart from 'containers/Shoppingcart/'
// import AddressList from 'containers/AddressList/'
// import Address from 'containers/Address/'
// import OrderConfirm from 'containers/OrderConfirm/'
// import OrderList from 'containers/OrderList/'
// import Order from 'containers/Order/'
// import Logistics from 'containers/Logistics/'
// import Want from 'containers/Want/'
// import VoteList from 'containers/VoteList/'
// import Vote from 'containers/Vote/'
// import VoteResult from 'containers/VoteResult/'
// import ErrorPage from 'containers/ErrorPage'

const onlyVoteHost = ['mall.lianjia.com']
const routes = ~onlyVoteHost.indexOf(window.location.hostname)
  ? [
    {
      path: '/want',
      exact: true,
      // component: Want,
      chunk: () => System.import('containers/Want/'),
      title: '需求登记'
    },
    {
      path: '/voteList',
      exact: true,
      // component: VoteList,
      chunk: () => System.import('containers/VoteList/'),
      title: '投票专栏'
    },
    {
      path: '/vote',
      exact: true,
      // component: Vote,
      chunk: () => System.import('containers/Vote/'),
      title: '投票'
    },
    {
      path: '/voteResult',
      exact: true,
      // component: VoteResult,
      chunk: () => System.import('containers/VoteResult/'),
      title: '投票结果'
    },
    {
      path: '/errorPage',
      exact: true,
      // component: ErrorPage,
      chunk: () => System.import('containers/ErrorPage/'),
      title: '错误'
    }
  ]
  : [
    {
      path: '/',
      exact: true,
      // component: Home,
      chunk: () => System.import('containers/Home/'),
      title: '链家·优品'
    },
    {
      path: '/search',
      exact: true,
      // component: Result,
      chunk: () => System.import('containers/Result/'),
      title: '优品目录'
    },
    {
      path: '/item',
      exact: true,
      // component: Detail,
      chunk: () => System.import('containers/Detail/'),
      title: '商品详情'
    },
    {
      path: '/collocation',
      exact: true,
      // component: Collocation,
      chunk: () => System.import('containers/Collocation/'),
      title: '搭配详情'
    },
    // {
    //   path: '/subject',
    //   exact: true,
    //   // component: Subject,
    //   chunk: () => System.import('containers/Subject/'),
    //   title: '专题'
    // },
    {
      path: '/shoppingcart',
      exact: true,
      // component: Shoppingcart,
      chunk: () => System.import('containers/Shoppingcart/'),
      title: '购物车'
    },
    {
      path: '/addressList',
      exact: true,
      // component: AddressList,
      chunk: () => System.import('containers/AddressList/'),
      title: '地址管理'
    },
    {
      path: '/address',
      exact: true,
      // component: Address,
      chunk: () => System.import('containers/Address/'),
      title: '新建地址'
    },
    {
      path: '/orderConfirm',
      exact: true,
      // component: OrderConfirm,
      chunk: () => System.import('containers/OrderConfirm/'),
      title: '确认订单'
    },
    {
      path: '/orderList',
      exact: true,
      // component: OrderList,
      chunk: () => System.import('containers/OrderList/'),
      title: '订单列表'
    },
    {
      path: '/order',
      exact: true,
      // component: Order,
      chunk: () => System.import('containers/Order/'),
      title: '订单详情'
    },
    {
      path: '/logistics',
      exact: true,
      // component: Logistics,
      chunk: () => System.import('containers/Logistics/'),
      title: '追踪物流'
    },
    {
      path: '/want',
      exact: true,
      // component: Want,
      chunk: () => System.import('containers/Want/'),
      title: '需求登记'
    },
    // {
    //   path: '/success',
    //   exact: true,
    //   // component: Success,
    //   chunk: () => System.import('containers/Success/'),
    //   title: '预约成功'
    // },
    {
      path: '/voteList',
      exact: true,
      // component: VoteList,
      chunk: () => System.import('containers/VoteList/'),
      title: '投票专栏'
    },
    {
      path: '/vote',
      exact: true,
      // component: Vote,
      chunk: () => System.import('containers/Vote/'),
      title: '投票'
    },
    {
      path: '/voteResult',
      exact: true,
      // component: VoteResult,
      chunk: () => System.import('containers/VoteResult/'),
      title: '投票结果'
    },
    {
      path: '/errorPage',
      exact: true,
      // component: ErrorPage,
      chunk: () => System.import('containers/ErrorPage/'),
      title: '错误'
    }
  ]

export default routes
