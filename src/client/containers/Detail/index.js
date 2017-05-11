import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Slider from 'components/Slider/'
import FootBar from 'components/FootBar/'
import BuyPanel from 'components/BuyPanel/'
import InfoPanel from 'components/InfoPanel/'

import ItemOverview from 'components/ItemOverview/'
import ItemChoose from 'components/ItemChoose/'
import ItemDeatil from 'components/ItemDeatil/'
import TelUs from 'components/TelUs/'
import wantPic from 'common/img/want.png'

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
    showInfo: 1             // 1展示服务说明 2展示产品参数
  }

  handleShowBuy = (payload) => this.setState({show: payload})

  handleShowInfo = (payload) => this.setState({showInfo: payload})

  handleSubmit = (result) => {
    result.type_id = 1
    result.appoint_id = this.props.location.query.id
    this.props.dispatch(confirmOrder(result))
  }

  handleShowFullscreen = (e) => {
    e.preventDefault()
    this.setState({showFullscreen: true})
  }

  render () {
    const { reqData } = this.props.data.toJS()
    const { orderInfo } = this.props.shared.toJS()
    const { show, showInfo, currentImage, showFullscreen } = this.state

    // '-1'是所有图片的key
    const banner = (reqData.product_image_info || {'-1': []})['-1']

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
      <section><ItemOverview data={reqData} onShowService={() => this.handleShowInfo(1)} /></section>
      <section><ItemChoose data={reqData} onShowChoose={() => this.handleShowBuy(true)} onShowParam={() => this.handleShowInfo(2)} /></section>
      <section><ItemDeatil data={reqData} /></section>
      <section><TelUs data={{link: '/want', pic: wantPic}} /></section>
      <FootBar onBuy={() => this.handleShowBuy(true)} />
      <InfoPanel
        show={!!showInfo}
        type={showInfo + 0}
        title={showInfo === 1 ? '服务说明' : '产品参数'}
        data={reqData}
        onClose={() => this.handleShowInfo(false)} />
      <BuyPanel
        show={show}
        price={'￥' + orderInfo.price}
        info={orderInfo.info}
        img={orderInfo.img}
        content={orderInfo.content}
        onSubmit={this.handleSubmit.bind(this)}
        onClickCover={() => this.handleShowBuy(false)} />
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
