import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import NavBar from 'components/NavBar/'
import HotItems from 'components/HotItems/'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
import wantItem from 'common/img/wantItem.png'

@CSSModules(styles, { allowMultiple: true })
export class Home extends PureComponent {
  render () {
    const { categoryList } = this.props.shared.toJS()
    const { hotItems } = this.props.data.toJS()
    hotItems.push({
      wantItem: true,
      src: wantItem,
      title: '可能低价出现在这里哦',
      price: '立即登记'
    })

    return <div styleName='wrap'>
      <div styleName='banner'>
        主题banner
      </div>
      <div styleName='navOuter'>
        <NavBar data={categoryList.map(item => ({path: `/search?category=${item.categoryId}`, title: item.categoryName}))} />
      </div>
      <div styleName='label'>
        <h2 styleName='title'>你的专享</h2>
      </div>
      <div styleName='plat subject'>
        <div styleName='banner'>搭配banner</div>
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
