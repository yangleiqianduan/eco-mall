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
import wantPic from 'common/img/want.png'
import goodsDetailPic from 'common/img/goodsDetail.png'

import { getItemDetail } from 'actions/detail'
import { confirmOrder } from 'actions/index'

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
    showFullscreen: false,
  }
  handleBuyItem = () => {
    this.setState({show: true})
  }
  handleCover = () => {
    this.setState({show: false})
  }
  handleSubmit = (result) => {
    result.type_id = 1
    result.appoint_id = this.props.location.query.id
    this.props.dispatch(confirmOrder(result))
  }

  handleShowFullscreen = (e) => {
    e.preventDefault()
    this.setState({showFullscreen: true})
  }
  formatData = (reqData) => {
    let banner = []
    reqData.product_image_info && reqData.product_image_info[-1].map(item => {
      banner.push({
        img_url: item.img_url
      })
    })
    return banner
  }

  render () {
    const data = this.props.data.toJS() || {}
    const { goodsStandard } = this.props.data.toJS()
    const { orderInfo } = this.props.shared.toJS()

    const { currentImage, showFullscreen } = this.state
    let banner = []
    data.reqData && (banner = this.formatData(data.reqData))

    return <div styleName='wrap'>
      <section styleName='banner'>
        <Slider
          data={banner}
          onClick={this.handleShowFullscreen}
          setting={{dots: false, autoplay: false, afterChange: (e) => this.setState({currentImage: e})}} />
        {
          banner.length > 0
          ? <div styleName='page'><strong>{currentImage + 1}</strong>/{banner.length}</div>
          : null
        }
      </section>
      <section><ItemOverview data = { data } /></section>
      <section><ItemChoose data = { data } /></section>
      <section><ItemDeatil data = { {pic: goodsDetailPic} } /></section>
      <section><ItemStandard data = { goodsStandard } /></section>
      <section><ItemEnsureInfo data = { data } /></section>
      <section><TelUs data={ {link: '/want', pic: wantPic} }/></section>

      <BuyPanel
        show={this.state.show}
        price={'￥' + orderInfo.price}
        info={orderInfo.info}
        img={orderInfo.img}
        content={orderInfo.content}
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
  data: state.detail,
})

export default connect(mapStateToProps)(Detail)
