import Home from 'containers/Home/'
import Detail from 'containers/Detail/'
import Subject from 'containers/Subject/'
import Result from 'containers/Result/'

export default [
  {
    path: '/',
    exact: true,
    component: Home,
    title: '链家Mall'
  }, {
    path: '/item',
    exact: true,
    component: Detail,
    title: '商品详情'
  }, {
    path: '/subject',
    exact: true,
    component: Subject,
    title: '专题'
  }, {
    path: '/search',
    exact: true,
    component: Result,
    title: '商品列表'
  }
]
