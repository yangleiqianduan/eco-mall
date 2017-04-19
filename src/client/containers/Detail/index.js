import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Slider from 'components/Slider/'
import FootBar from 'components/FootBar/'
import BuyPanel from 'components/BuyPanel'

import ItemOverview from 'components/ItemOverview/'
import ItemChoose from 'components/ItemChoose/'
import ItemDeatil from 'components/ItemDeatil/'
import ItemStandard from 'components/ItemStandard/'
import ItemEnsureInfo from 'components/ItemEnsureInfo/'
import TelUs from 'components/TelUs/'

import { getItemDetail } from 'actions/detail'

@CSSModules(styles, {allowMultiple: true})
export class Detail extends PureComponent {
  componentDidMount () {
    const query = this.props.location.query.id
    this.getItemDetail(query)
  }
  getItemDetail = (query) => {
    this.props.dispatch(getItemDetail(query))
  }
  state={
    show: false,
    currentImage: 0,
    showFullscreen: false
  }
  handleBuyItem = () => {
    this.setState({show: true})
  }
  handleCover = () => {
    this.setState({show: false})
  }
  handleSubmit = () => {
    let data = this.props.data.toJS().buyInfo.content
    let param = {
      telNo: data[0].value,
      sysNo: data[0].value
    }
    console.log(param)
  }
  handleChangeBuyInfo = (map, e) => {
    let value = e.target.value
    this.props.dispatch(actions.UPDATE_ORDER_INFO_ACTION(['buyInfo'].concat(map), value))
  }
  handleShowFullscreen = (e) => {
    e.preventDefault()
    this.setState({showFullscreen: true})
  }
  render () {
    const { banner, baseInfo, choose, detailInfo, goodsStandard, ensureInfo, buyInfo, reqData } = this.props.data.toJS()
    const { currentImage, showFullscreen } = this.state
    return <div styleName='wrap'>
      <section styleName='banner'>
        <Slider data={banner} onClick={this.handleShowFullscreen} setting={{dots: false, autoplay: false, afterChange: (e) => this.setState({currentImage: e})}} />
        {
          banner.length > 0
          ? <div styleName='page'><strong>{currentImage + 1}</strong>/{banner.length}</div>
          : null
        }
      </section>

      <section><ItemOverview data = { baseInfo } /></section>
      <section><ItemChoose data = { choose } /></section>
      <section><ItemDeatil data = { detailInfo } /></section>
      <section><ItemStandard data = { goodsStandard } /></section>
      <section><ItemEnsureInfo data = { ensureInfo } /></section>
      <section><TelUs data = {{}} /></section>

      <BuyPanel
        show={this.state.show}
        price={'￥' + buyInfo.price}
        info={buyInfo.info}
        content={buyInfo.content}
        onChange={this.handleChangeBuyInfo.bind(this)}
        onSubmit={this.handleSubmit.bind(this)}
        onClickCover={this.handleCover.bind(this)} />
      <FootBar onBuy={this.handleBuyItem.bind(this)} />
      {showFullscreen
        ? <Slider data={banner} fullscreen onClose={() => this.setState({showFullscreen: false})} setting={{dots: false, autoplay: false, afterChange: (e) => this.setState({currentImage: e})}} />
        : null
      }
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.detail
})

export default connect(mapStateToProps)(Detail)
