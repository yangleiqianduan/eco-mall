import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import NavBar from 'components/NavBar/'
import HotItems from 'components/HotItems/'
import Slider from 'components/Slider/'
import Nav from 'components/Nav/'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
// import wantItem from 'common/img/wantItem.png'

import { getHotItems, getBanner } from 'actions/home'
import { getCartCount } from 'actions/'

import { stat } from 'common/stat'

@CSSModules(styles, { allowMultiple: true })
export class Home extends PureComponent {
  state = {
    footerSrc: 'http://img.ljcdn.com/lmall/b017714a-414c-44e1-b63c-d0e4f4edf4b2.png.616x98.png',
    currentSubject: 0
    // currentCollocation: 0
  }
  componentDidMount () {
    // this.props.dispatch(getCollocationList())
    this.props.dispatch(getHotItems())
    this.props.dispatch(getBanner())
    this.props.dispatch(getCartCount())
  }

  handleClickNeed = (e, i) => {
    if (i === 1) {
      stat('event', 'mall_home', 'click', '需求登记')
    }
  }

  handleClickCategory = (item) => {
    stat('event', 'mall_home', 'click', `类目-${item.categoryName}`)
  }

  render () {
    const { categoryList, cartCount } = this.props.shared.toJS()
    const { hotItems, banner, wantList } = this.props.data.toJS()
    const {
      // currentCollocation,
      currentSubject,
      footerSrc
    } = this.state
    const navList = categoryList.slice(0, 4)
    // const collocationList = collocation.map(item => ({img_url: item.picture, title: item.productMixName, desc: item.productMixDescription, redirect_url: `/collocation?id=${item.productMixId}`}))
    // hotItems.push({
    //   wantItem: true,
    //   firstPageUrl: wantItem,
    //   productName: '可能低价出现在这里哦',
    //   marketPrice: '立即登记'
    // })
    const topBanner = banner.filter(c => c.location === 10)
    const subject = banner.filter(c => c.location === 30).map(s => Object.assign(s, {title: s.name, desc: s.advert_desc}))

    return <div styleName='wrap'>
      <div styleName='banner'>
        <Slider data={topBanner} setting={{infinite: true}} />
      </div>
      <div styleName='navOuter'>
        <NavBar data={navList.map(item => ({path: `/search?categoryId=${item.categoryId}`, title: item.categoryName, icon: item.icon, onClick: () => this.handleClickCategory(item)}))} />
      </div>
      <div styleName='label'>
        <h2 styleName='title'>精选专题</h2>
        {subject.length > 0 ? <div styleName='page'><i styleName='current'>{currentSubject + 1}</i><i styleName='total'>&nbsp;<span>/</span>{subject.length}</i></div> : null}
      </div>
      <div styleName='plat subject'>
        <Slider data={subject} needDesc setting={{slidesToShow: 1.1, dots: false, autoplay: false, afterChange: (e) => this.setState({currentSubject: Math.round(e)})}} slideStyle={{paddingRight: '0.11rem'}} />
      </div>
      <div styleName='label'>
        <h2 styleName='title'>我想买<span styleName='subTitle'>更多选品方式</span></h2>
      </div>
      <div styleName='plat subject'>
        <Slider data={wantList} onClick={this.handleClickNeed} setting={{slidesToShow: 1.1, dots: false, autoplay: false, variableWidth: true}} slideStyle={{paddingRight: '0.11rem', width: '2.08rem'}} />
      </div>
      <div styleName='label'>
        <h2 styleName='title'>为你推荐</h2>
      </div>
      <div styleName='plat'>
        <HotItems data={hotItems} />
      </div>
      <div styleName='footer'>
        <img src={footerSrc} />
      </div>
      <Nav cartCount={cartCount} />
    </div>
  }
}

// 专题
//      <div styleName='label'>
//        <h2 styleName='title'>精选搭配</h2>
//        {collocationList.length > 0 ? <div><i styleName='current'>{currentCollocation + 1}</i>/{collocationList.length}</div> : null}
//      </div>
//      <div styleName='plat subject'>
//        <Slider data={collocationList} needDesc setting={{slidesToShow: 1.1, dots: false, autoplay: false, afterChange: (e) => this.setState({currentCollocation: Math.round(e)})}} slideStyle={{paddingRight: '0.11rem'}} />
//      </div>

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.home
})

export default connect(mapStateToProps)(Home)
