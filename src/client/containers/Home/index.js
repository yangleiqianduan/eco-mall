import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import NavBar from 'components/NavBar/'
import HotItems from 'components/HotItems/'
import Slider from 'components/Slider/'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
import wantItem from 'common/img/wantItem.png'

@CSSModules(styles, { allowMultiple: true })
export class Home extends PureComponent {
  state = {
    currentCollocation: 0
  }
  render () {
    const { categoryList } = this.props.shared.toJS()
    const { hotItems, banner, collocation } = this.props.data.toJS()
    const { currentCollocation } = this.state
    hotItems.push({
      wantItem: true,
      src: wantItem,
      title: '可能低价出现在这里哦',
      price: '立即登记'
    })

    return <div styleName='wrap'>
      <div styleName='banner'>
        <Slider data={banner} setting={{infinite: true}} />
      </div>
      <div styleName='navOuter'>
        <NavBar data={categoryList.map(item => ({path: `/search?categoryId=${item.categoryId}`, title: item.categoryName}))} />
      </div>
      <div styleName='label'>
        <h2 styleName='title'>精选搭配</h2>
        {collocation.length > 0 ? <div><i styleName='current'>{currentCollocation + 1}</i>/{collocation.length}</div> : null}
      </div>
      <div styleName='plat subject'>
        <Slider data={collocation} needDesc setting={{slidesToShow: 1.1, dots: false, autoplay: false, afterChange: (e) => this.setState({currentCollocation: Math.round(e)})}} slideStyle={{paddingRight: '1rem'}} />
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
