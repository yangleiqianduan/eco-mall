import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import NavBar from 'components/NavBar/'
import HotItems from 'components/HotItems/'
import Slider from 'components/Slider/'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
import wantItem from 'common/img/wantItem.png'

import { getCollocationList, getHotItems, getBanner } from 'actions/home'

@CSSModules(styles, { allowMultiple: true })
export class Home extends PureComponent {
  state = {
    currentCollocation: 0
  }
  componentDidMount () {
    this.props.dispatch(getCollocationList())
    this.props.dispatch(getHotItems())
    this.props.dispatch(getBanner())
  }
  render () {
    const { categoryList } = this.props.shared.toJS()
    const { hotItems, banner, collocation } = this.props.data.toJS()
    const { currentCollocation } = this.state
    const collocationList = collocation.map(item => ({img_url: item.picture, title: item.productMixName, desc: item.productMixDescription, redirect_url: `/collocation?id=${item.productMixId}`}))
    hotItems.push({
      wantItem: true,
      firstPageUrl: wantItem,
      productName: '可能低价出现在这里哦',
      marketPrice: '立即登记'
    })

    return <div styleName='wrap'>
      <div styleName='banner'>
        <Slider data={banner} setting={{infinite: true}} />
      </div>
      <div styleName='navOuter'>
        <NavBar data={categoryList.map(item => ({path: `/search?categoryId=${item.categoryId}`, title: item.categoryName, icon: item.icon}))} />
      </div>
      <div styleName='label'>
        <h2 styleName='title'>精选搭配</h2>
        {collocationList.length > 0 ? <div><i styleName='current'>{currentCollocation + 1}</i>/{collocationList.length}</div> : null}
      </div>
      <div styleName='plat subject'>
        <Slider data={collocationList} needDesc setting={{slidesToShow: 1.1, dots: false, autoplay: false, afterChange: (e) => this.setState({currentCollocation: Math.round(e)})}} slideStyle={{paddingRight: '0.11rem'}} />
      </div>
      <div styleName='label'>
        <h2 styleName='title'>为你推荐</h2>
      </div>
      <div styleName='plat'>
        <HotItems data={hotItems} />
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.home
})

export default connect(mapStateToProps)(Home)
